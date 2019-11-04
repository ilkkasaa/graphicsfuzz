# Layer

cmake_minimum_required(VERSION 3.10.2)

# Add platform spesific definitions (copied from VulkanTools/layer_factory)
if(CMAKE_SYSTEM_NAME STREQUAL "Windows")
    add_definitions(-DVK_USE_PLATFORM_WIN32_KHR -DVK_USE_PLATFORM_WIN32_KHX -DWIN32_LEAN_AND_MEAN)
    set(DisplayServer Win32)
elseif(CMAKE_SYSTEM_NAME STREQUAL "Android")
    add_definitions(-DVK_USE_PLATFORM_ANDROID_KHR -DVK_USE_PLATFORM_ANDROID_KHX)
elseif(CMAKE_SYSTEM_NAME STREQUAL "Linux")
    if (BUILD_WSI_XCB_SUPPORT)
        add_definitions(-DVK_USE_PLATFORM_XCB_KHR -DVK_USE_PLATFORM_XCB_KHX)
    endif()

    if (BUILD_WSI_XLIB_SUPPORT)
       add_definitions(-DVK_USE_PLATFORM_XLIB_KHR -DVK_USE_PLATFORM_XLIB_KHX -DVK_USE_PLATFORM_XLIB_XRANDR_EXT)
    endif()

    if (BUILD_WSI_WAYLAND_SUPPORT)
       add_definitions(-DVK_USE_PLATFORM_WAYLAND_KHR -DVK_USE_PLATFORM_WAYLAND_KHX)
    endif()
else()
    message(FATAL_ERROR "Unsupported Platform!")
endif()

# Add platform independent definitions

add_definitions(
    -DAPI_NAME="Vulkan"
    -D_USE_MATH_DEFINES
    -D_DEBUG)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/../layers)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/../layers)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/../layers)

set(SPIRV_FUZZ_LAYER_SRCS
    interceptor_objects.h
    ${CMAKE_CURRENT_BINARY_DIR}/layer_factory.h
    ${CMAKE_CURRENT_BINARY_DIR}/layer_factory.cpp
    layer.cpp
    layer.h
    )

#set(VULKAN_LAYERFACTORY_DIR
#	"$ENV{VULKAN_SDK}\\LayerFactory")

#configure_file(${CMAKE_CURRENT_SOURCE_DIR}/VkLayer_spirv_fuzz_layer.json ${CMAKE_CURRENT_BINARY_DIR}/VkLayer_spirv_fuzz_layer.json COPYONLY)



include_directories(${CMAKE_CURRENT_SOURCE_DIR})
include_directories(${Vulkan_INCLUDE_DIR})
include_directories(${Vulkan_LAYER_FACTORY_DIRS})
include_directories(${CMAKE_CURRENT_BINARY_DIR})
include_directories(${Vulkan-ValidationLayers_INCLUDE_DIR})
include_directories(${VULKAN_TOOLS_SOURCE_DIR}/layer_factory)

link_libraries(${Vulkan_LAYER_FACTORY_LIBRARIES})

#add_definitions(
#	-DAPI_NAME="Vulkan"
#	-DVK_USE_PLATFORM_WIN32_KHR
#	-DVK_PROTOTYPES
#	-DWIN32_LEAN_AND_MEAN
#	-D_CRT_SECURE_NO_WARNINGS
#	-D_USE_MATH_DEFINES
#	-D_DEBUG
#	)

# Set flags (copied from VulkanTools/layer_factory)
if (WIN32)
    set (CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -D_CRT_SECURE_NO_WARNINGS")
    set (CMAKE_C_FLAGS_RELEASE   "${CMAKE_C_FLAGS_RELEASE} -D_CRT_SECURE_NO_WARNINGS")
    set (CMAKE_CXX_FLAGS_RELWITHDEBINFO "${CMAKE_CXX_FLAGS_RELWITHDEBINFO} -D_CRT_SECURE_NO_WARNINGS")
    set (CMAKE_C_FLAGS_RELWITHDEBINFO "${CMAKE_C_FLAGS_RELWITHDEBINFO} -D_CRT_SECURE_NO_WARNINGS")
    set (CMAKE_CXX_FLAGS_DEBUG   "${CMAKE_CXX_FLAGS_DEBUG} -D_CRT_SECURE_NO_WARNINGS /bigobj")
    set (CMAKE_C_FLAGS_DEBUG     "${CMAKE_C_FLAGS_DEBUG} -D_CRT_SECURE_NO_WARNINGS /bigobj")
    # Turn off transitional "changed behavior" warning message for Visual Studio versions prior to 2015.
    # The changed behavior is that constructor initializers are now fixed to clear the struct members.
    add_compile_options("$<$<AND:$<CXX_COMPILER_ID:MSVC>,$<VERSION_LESS:$<CXX_COMPILER_VERSION>,19>>:/wd4351>")
else()
    set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 -Wpointer-arith -Wno-unused-function -Wno-sign-compare")
    set (CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wpointer-arith -Wno-unused-function -Wno-sign-compare")
endif()

# Generate layer_factory.cpp and layer_factory.h files
run_vulkantools_vk_xml_generate(layer_factory_generator.py layer_factory.h)
run_vulkantools_vk_xml_generate(layer_factory_generator.py layer_factory.cpp)
add_custom_target(generate_vlf DEPENDS ${CMAKE_CURRENT_BINARY_DIR}/layer_factory.cpp ${CMAKE_CURRENT_BINARY_DIR}/layer_factory.h)
set_target_properties(generate_vlf PROPERTIES FOLDER ${VULKANTOOLS_TARGET_FOLDER})

# Paths for the layer factory json template and the destination for factory layer json files
set (JSON_TEMPLATE_PATH ${VULKAN_TOOLS_SOURCE_DIR}/layer_factory/layer_factory.json.in)
if (WIN32)
    set (JSON_DEST_PATH ${CMAKE_CURRENT_BINARY_DIR})
else()
    set (JSON_DEST_PATH ${CMAKE_CURRENT_BINARY_DIR}/../layers)
endif()

# The output file needs Unix "/" separators or Windows "\" separators
# On top of that, Windows separators actually need to be doubled because the json format uses backslash escapes
file(TO_NATIVE_PATH "./" RELATIVE_PATH_PREFIX)
string(REPLACE "\\" "\\\\" RELATIVE_PATH_PREFIX "${RELATIVE_PATH_PREFIX}")

file(WRITE "${CMAKE_CURRENT_BINARY_DIR}/generator.cmake" "configure_file(\"\${INPUT_FILE}\" \"\${OUTPUT_FILE}\")")
set(SUBDIR spirv_fuzz_layer)
set(TARGET_NAME VkLayer_spirv_fuzz_layer)
set(CONFIG_DEFINES
    -DINPUT_FILE=${JSON_TEMPLATE_PATH}
    -DVK_VERSION="${VulkanHeaders_VERSION_MAJOR}.${VulkanHeaders_VERSION_MINOR}.${VulkanHeaders_VERSION_PATCH}"
)
set(CONFIG_DEFINES ${CONFIG_DEFINES}
    -DOUTPUT_FILE="$<TARGET_FILE_DIR:${TARGET_NAME}>/${TARGET_NAME}.json"
    -DRELATIVE_LAYER_BINARY="${RELATIVE_PATH_PREFIX}$<TARGET_FILE_NAME:${TARGET_NAME}>"
    -DLAYER_NAME="VK_LAYER_LUNARG_${SUBDIR}"
)
if(WIN32)
    add_custom_target(${TARGET_NAME}-json ALL
            COMMAND ${CMAKE_COMMAND} ${CONFIG_DEFINES} -P "${CMAKE_CURRENT_BINARY_DIR}/generator.cmake"
    )
else()
    add_custom_target(${TARGET_NAME}-json ALL
            COMMAND ${CMAKE_COMMAND} ${CONFIG_DEFINES} -P "${CMAKE_CURRENT_BINARY_DIR}/generator.cmake"
            COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_CURRENT_BINARY_DIR}/../layers/staging-json
            COMMAND ${CMAKE_COMMAND} -E copy ${JSON_DEST_PATH}/VkLayer_${SUBDIR}.json ${CMAKE_CURRENT_BINARY_DIR}/../layers/staging-json
            COMMAND sed -i -e "/library_path.:/s=./libVkLayer=libVkLayer=" ${CMAKE_CURRENT_BINARY_DIR}/../layers/staging-json/VkLayer_${SUBDIR}.json
    )
endif()

if (WIN32)
    # Read in def file template, update with new layer name and write to destination
    file(READ ${VULKAN_TOOLS_SOURCE_DIR}/layer_factory/VkLayer_layer_factory.def def_file_template)
    string(REPLACE "layer_factory" "spirv_fuzz_layer" target_def_file ${def_file_template})
    file(WRITE ${CMAKE_CURRENT_BINARY_DIR}/${TARGET_NAME}.def ${target_def_file})
    # Edit json template and copy to build\layers dir at cmake time
    file(READ "${JSON_TEMPLATE_PATH}" json_file_template)
    string(REPLACE "layer_factory" "spirv_fuzz_layer" target_json_file "${json_file_template}")
    file(TO_NATIVE_PATH ${JSON_DEST_PATH}/${TARGET_NAME}.json dst_json)
    file(WRITE ${dst_json} ${target_json_file})

    add_library(${TARGET_NAME} SHARED ${SPIRV_FUZZ_LAYER_SRCS} ${TARGET_NAME}.def)
    
    target_include_directories(${TARGET_NAME} PRIVATE ${SUBDIR})
else()
    # Create custom target for the copies so that json template is copied and edited at compile time
    file(READ "${JSON_TEMPLATE_PATH}" json_file_template)
    string(REPLACE "layer_factory" "spirv_fuzz_layer" target_json_file "${json_file_template}")
    file(TO_NATIVE_PATH ${JSON_DEST_PATH}/${TARGET_NAME}.json dst_json)
    file(WRITE ${dst_json} ${target_json_file})
    add_library(${TARGET_NAME} SHARED ${SPIRV_FUZZ_LAYER_SRCS})
    
    target_include_directories(${TARGET_NAME} PRIVATE ${SUBDIR})
    set_target_properties(${TARGET_NAME} PROPERTIES LINK_FLAGS "-Wl,-Bsymbolic,--exclude-libs,ALL")
endif()

#set(CMAKE_SHARED_LINKER_FLAGS "${CMAKE_SHARED_LINKER_FLAGS} /SUBSYSTEM:WINDOWS")

set_property(TARGET ${TARGET_NAME} PROPERTY PROJECT_LABEL "spirv_fuzz_layer")

target_link_libraries(${TARGET_NAME} ${SPIRV_FUZZ_LAYER_LIBS})
target_link_libraries(${TARGET_NAME} ${Vulkan_LAYER_FACTORY_LIBRARIES})
target_link_libraries(${TARGET_NAME} ${Vulkan_LIBRARY})
target_link_Libraries(${TARGET_NAME} ${VkLayer_utils_LIBRARY})

add_dependencies(${TARGET_NAME} generate_vlf)

#add_dependencies(${TARGET_NAME} ${TARGET_NAME}-json)

#add_custom_command(TARGET ${TARGET_NAME}
#	POST_BUILD
#	COMMAND xcopy /Y 
#	ARGS "$(ProjectDir)VkLayer_$(ProjectName).json" "$(OutDir)"
#	)

#target_link_libraries(VkLayer_spirv_fuzz_layer "${VULKAN_LAYERFACTORY_DIR}\\Project\\$(Platform)\\$(Configuration)\\layer_factory.lib")
