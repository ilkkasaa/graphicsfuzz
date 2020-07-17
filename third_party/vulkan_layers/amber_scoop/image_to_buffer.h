/*
 * Copyright 2020 The GraphicsFuzz Project Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

#ifndef GRAPHICSFUZZ_VULKAN_LAYERS_IMAGE_TO_BUFFER_H
#define GRAPHICSFUZZ_VULKAN_LAYERS_IMAGE_TO_BUFFER_H

#include <vulkan/vulkan.h>

#include <memory>

#include "layer_impl.h"
#include "vulkan_commands.h"

namespace graphicsfuzz_amber_scoop {

class ImageToBuffer {
 public:
  /**
   * Copies buffer contents from the given buffer to a host readable buffer.
   * Creates a new command buffer for the copy commands and submits the command
   * buffer to the given queue. Waits for the copy commands to finish before
   * returning from the function.
   *
   * @param [in] queue Queue where the copy commands will be submitted to.
   * @param [in] queue_family_index Queue family index of the given queue. Used
   * to create a new command pool.
   * @param [in] pipeline_barriers Pipeline barriers that must be waited before
   * copying can be performed.
   * @param [in] buffer Buffer where the data is copied from.
   * @param [in] buffer_size Size of the buffer in bytes.
   */
  void CopyImageToBuffer(
      VkQueue queue, uint32_t queue_family_index,
      const VkImageCreateInfo &image, const VkImageViewCreateInfo &image_view);

  void FreeResources();

  uint8_t *copied_data_;
  VkDeviceSize data_size = 0;

 private:
  VkBuffer buffer_copy_;
  VkDeviceMemory buffer_copy_memory_;
  VkCommandPool command_pool_;
  VkCommandBuffer command_buffer_;
  VkDevice device_;

  uint32_t FindMemoryType(uint32_t typeFilter,
                          VkMemoryPropertyFlags properties);

};  // class BufferCopy

}  // namespace graphicsfuzz_amber_scoop

#endif  // GRAPHICSFUZZ_VULKAN_LAYERS_IMAGE_TO_BUFFER_H
