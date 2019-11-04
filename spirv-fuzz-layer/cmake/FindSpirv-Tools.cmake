#
# FindSpirv-Tools
# -----------------

find_path(Spirv-Tools_INCLUDE_DIR
    NAMES vulkan/vulkan.h
    HINTS
        ${VULKAN_HEADERS_INSTALL_DIR}/include
        "$ENV{VULKAN_HEADERS_INSTALL_DIR}/include"
        "$ENV{VULKAN_SDK}/include")

set(VulkanHeaders_INCLUDE_DIRS ${VulkanHeaders_INCLUDE_DIR})
set(VulkanRegistry_DIRS ${VulkanRegistry_DIR})

include(FindPackageHandleStandardArgs)
find_package_handle_standard_args(VulkanHeaders
    DEFAULT_MSG
    VulkanHeaders_INCLUDE_DIR)
find_package_handle_standard_args(VulkanRegistry
    DEFAULT_MSG
    VulkanRegistry_DIR)

mark_as_advanced(VulkanHeaders_INCLUDE_DIR VulkanRegistry_DIR)
