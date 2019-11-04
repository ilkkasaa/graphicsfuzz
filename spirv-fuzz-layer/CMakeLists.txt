#Top project

cmake_minimum_required(VERSION 3.0)

project(spirv-fuzz-layer)

find_package(PythonInterp 3 REQUIRED)
set (PYTHON_CMD ${PYTHON_EXECUTABLE})

# Enable cmake folders
set_property(GLOBAL PROPERTY USE_FOLDERS ON)
set(VULKANTOOLS_TARGET_FOLDER vt_cmake_targets)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_CURRENT_SOURCE_DIR}/cmake")

set(VULKAN_HEADERS_INSTALL_DIR "HEADERS-NOTFOUND" CACHE PATH "Absolute path to a Vulkan-Headers install directory")

set(CMAKE_PREFIX_PATH ${CMAKE_PREFIX_PATH};${VULKAN_HEADERS_INSTALL_DIR};$ENV{VULKAN_HEADERS_INSTALL_DIR})

message(STATUS "Using find_package to locate Vulkan")
find_package(VulkanHeaders)
find_package(Vulkan)

#find_package(Spirv-Tools)
#get_filename_component(Vulkan_LIBRARY_DIR ${Vulkan_LIBRARY} DIRECTORY)
#get_filename_component(Vulkan_LAYER_FACTORY_LIBRARY_DIR ${Vulkan_LAYER_FACTORY_LIBRARY} DIRECTORY)

set(Vulkan-ValidationLayers_LIBRARY_DIR "${VULKAN_VALIDATIONLAYERS_INSTALL_DIR}/lib")
find_library(VkLayer_utils_LIBRARY VkLayer_utils HINTS ${Vulkan-ValidationLayers_LIBRARY_DIR})

message(STATUS "Vulkan FOUND = ${Vulkan_FOUND}")
message(STATUS "Vulkan Lib Dir = ${Vulkan_LIBRARY_DIR}")
message(STATUS "Vulkan Lib = ${Vulkan_LIBRARY}")
message(STATUS "Vulkan Include Dir = ${Vulkan_INCLUDE_DIR}")
message(STATUS "Vulkan Headers Include = ${VulkanHeaders_INCLUDE_DIR}")
message(STATUS "Vulkan Headers Registry = ${VulkanRegistry_DIR}")
message(STATUS "Vulkan Layer Factory = ${Vulkan_LAYER_FACTORY}")
message(STATUS "Vulkan Layer Factory include = ${Vulkan_LAYER_FACTORY_INCLUDE}")
message(STATUS "Vulkan Utils Library = ${VkLayer_utils_LIBRARY}")

# Define macro used for building vkxml generated files
macro(run_vulkantools_vk_xml_generate dependency output)
	add_custom_command(OUTPUT ${output}
	COMMAND ${PYTHON_CMD} -B ${VULKANTOOLS_SCRIPTS_DIR}/vt_genvk.py -registry ${VulkanRegistry_DIR}/vk.xml -scripts ${VulkanRegistry_DIR} ${output}
	DEPENDS ${VulkanRegistry_DIR}/vk.xml ${VulkanRegistry_DIR}/generator.py ${VULKANTOOLS_SCRIPTS_DIR}/${dependency} ${VULKANTOOLS_SCRIPTS_DIR}/vt_genvk.py ${VulkanRegistry_DIR}/reg.py
	)
endmacro()

add_subdirectory(spirv-fuzz-layer)

include_directories(
	spirv-fuzz-layer)
	
# spirv-tools
#add_subdirectory(external/spirv-tools)
