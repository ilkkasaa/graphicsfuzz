# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: gfauto/recipe.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='gfauto/recipe.proto',
  package='gfauto',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n\x13gfauto/recipe.proto\x12\x06gfauto\"\x93\x04\n\x06Recipe\x12(\n\x07\x63ommand\x18\x01 \x01(\x0b\x32\x15.gfauto.RecipeCommandH\x00\x12Z\n#glsl_shader_job_to_spirv_shader_job\x18\x02 \x01(\x0b\x32+.gfauto.RecipeGlslShaderJobToSpirvShaderJobH\x00\x12\x63\n(spirv_shader_job_to_spirv_shader_job_opt\x18\x03 \x01(\x0b\x32/.gfauto.RecipeSpirvShaderJobToSpirvShaderJobOptH\x00\x12Q\n\x1eglsl_shader_job_add_red_pixels\x18\x04 \x01(\x0b\x32\'.gfauto.RecipeGlslShaderJobAddRedPixelsH\x00\x12\\\n$spirv_asm_shader_job_to_amber_script\x18\x05 \x01(\x0b\x32,.gfauto.RecipeSpirvAsmShaderJobToAmberScriptH\x00\x12\x63\n(spirv_shader_job_to_spirv_asm_shader_job\x18\x06 \x01(\x0b\x32/.gfauto.RecipeSpirvShaderJobToSpirvAsmShaderJobH\x00\x42\x08\n\x06recipe\" \n\rRecipeCommand\x12\x0f\n\x07\x63ommand\x18\x01 \x03(\t\"k\n#RecipeGlslShaderJobToSpirvShaderJob\x12 \n\x18glsl_shader_job_artifact\x18\x01 \x01(\t\x12\"\n\x1aglslang_validator_artifact\x18\x02 \x01(\t\"\x80\x01\n\'RecipeSpirvShaderJobToSpirvShaderJobOpt\x12!\n\x19spirv_shader_job_artifact\x18\x01 \x01(\t\x12\x16\n\x0espirv_opt_args\x18\x02 \x03(\t\x12\x1a\n\x12spirv_opt_artifact\x18\x03 \x01(\t\"c\n\x1fRecipeGlslShaderJobAddRedPixels\x12 \n\x18glsl_shader_job_artifact\x18\x01 \x01(\t\x12\x1e\n\x16graphics_fuzz_artifact\x18\x02 \x01(\t\"h\n\'RecipeSpirvShaderJobToSpirvAsmShaderJob\x12!\n\x19spirv_shader_job_artifact\x18\x01 \x01(\t\x12\x1a\n\x12spirv_dis_artifact\x18\x02 \x01(\t\"\xe1\x02\n$RecipeSpirvAsmShaderJobToAmberScript\x12%\n\x1dspirv_asm_shader_job_artifact\x18\x01 \x01(\t\x12 \n\x18make_self_contained_test\x18\x02 \x01(\x08\x12 \n\x18\x61mber_script_output_file\x18\x03 \x01(\t\x12&\n\x1e\x63opyright_header_text_artifact\x18\x04 \x01(\t\x12\x1d\n\x15\x61\x64\x64_generated_comment\x18\x05 \x01(\x08\x12!\n\x19\x61\x64\x64_graphics_fuzz_comment\x18\x06 \x01(\x08\x12\x1d\n\x15\x63omment_text_artifact\x18\x07 \x01(\t\x12\"\n\x1a\x61\x64\x64_glsl_source_as_comment\x18\x08 \x01(\x08\x12!\n\x19use_default_fence_timeout\x18\t \x01(\x08\x62\x06proto3')
)




_RECIPE = _descriptor.Descriptor(
  name='Recipe',
  full_name='gfauto.Recipe',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='command', full_name='gfauto.Recipe.command', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='glsl_shader_job_to_spirv_shader_job', full_name='gfauto.Recipe.glsl_shader_job_to_spirv_shader_job', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='spirv_shader_job_to_spirv_shader_job_opt', full_name='gfauto.Recipe.spirv_shader_job_to_spirv_shader_job_opt', index=2,
      number=3, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='glsl_shader_job_add_red_pixels', full_name='gfauto.Recipe.glsl_shader_job_add_red_pixels', index=3,
      number=4, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='spirv_asm_shader_job_to_amber_script', full_name='gfauto.Recipe.spirv_asm_shader_job_to_amber_script', index=4,
      number=5, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='spirv_shader_job_to_spirv_asm_shader_job', full_name='gfauto.Recipe.spirv_shader_job_to_spirv_asm_shader_job', index=5,
      number=6, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
    _descriptor.OneofDescriptor(
      name='recipe', full_name='gfauto.Recipe.recipe',
      index=0, containing_type=None, fields=[]),
  ],
  serialized_start=32,
  serialized_end=563,
)


_RECIPECOMMAND = _descriptor.Descriptor(
  name='RecipeCommand',
  full_name='gfauto.RecipeCommand',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='command', full_name='gfauto.RecipeCommand.command', index=0,
      number=1, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=565,
  serialized_end=597,
)


_RECIPEGLSLSHADERJOBTOSPIRVSHADERJOB = _descriptor.Descriptor(
  name='RecipeGlslShaderJobToSpirvShaderJob',
  full_name='gfauto.RecipeGlslShaderJobToSpirvShaderJob',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='glsl_shader_job_artifact', full_name='gfauto.RecipeGlslShaderJobToSpirvShaderJob.glsl_shader_job_artifact', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='glslang_validator_artifact', full_name='gfauto.RecipeGlslShaderJobToSpirvShaderJob.glslang_validator_artifact', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=599,
  serialized_end=706,
)


_RECIPESPIRVSHADERJOBTOSPIRVSHADERJOBOPT = _descriptor.Descriptor(
  name='RecipeSpirvShaderJobToSpirvShaderJobOpt',
  full_name='gfauto.RecipeSpirvShaderJobToSpirvShaderJobOpt',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='spirv_shader_job_artifact', full_name='gfauto.RecipeSpirvShaderJobToSpirvShaderJobOpt.spirv_shader_job_artifact', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='spirv_opt_args', full_name='gfauto.RecipeSpirvShaderJobToSpirvShaderJobOpt.spirv_opt_args', index=1,
      number=2, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='spirv_opt_artifact', full_name='gfauto.RecipeSpirvShaderJobToSpirvShaderJobOpt.spirv_opt_artifact', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=709,
  serialized_end=837,
)


_RECIPEGLSLSHADERJOBADDREDPIXELS = _descriptor.Descriptor(
  name='RecipeGlslShaderJobAddRedPixels',
  full_name='gfauto.RecipeGlslShaderJobAddRedPixels',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='glsl_shader_job_artifact', full_name='gfauto.RecipeGlslShaderJobAddRedPixels.glsl_shader_job_artifact', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='graphics_fuzz_artifact', full_name='gfauto.RecipeGlslShaderJobAddRedPixels.graphics_fuzz_artifact', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=839,
  serialized_end=938,
)


_RECIPESPIRVSHADERJOBTOSPIRVASMSHADERJOB = _descriptor.Descriptor(
  name='RecipeSpirvShaderJobToSpirvAsmShaderJob',
  full_name='gfauto.RecipeSpirvShaderJobToSpirvAsmShaderJob',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='spirv_shader_job_artifact', full_name='gfauto.RecipeSpirvShaderJobToSpirvAsmShaderJob.spirv_shader_job_artifact', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='spirv_dis_artifact', full_name='gfauto.RecipeSpirvShaderJobToSpirvAsmShaderJob.spirv_dis_artifact', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=940,
  serialized_end=1044,
)


_RECIPESPIRVASMSHADERJOBTOAMBERSCRIPT = _descriptor.Descriptor(
  name='RecipeSpirvAsmShaderJobToAmberScript',
  full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='spirv_asm_shader_job_artifact', full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript.spirv_asm_shader_job_artifact', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='make_self_contained_test', full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript.make_self_contained_test', index=1,
      number=2, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='amber_script_output_file', full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript.amber_script_output_file', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='copyright_header_text_artifact', full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript.copyright_header_text_artifact', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='add_generated_comment', full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript.add_generated_comment', index=4,
      number=5, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='add_graphics_fuzz_comment', full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript.add_graphics_fuzz_comment', index=5,
      number=6, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='comment_text_artifact', full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript.comment_text_artifact', index=6,
      number=7, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='add_glsl_source_as_comment', full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript.add_glsl_source_as_comment', index=7,
      number=8, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='use_default_fence_timeout', full_name='gfauto.RecipeSpirvAsmShaderJobToAmberScript.use_default_fence_timeout', index=8,
      number=9, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=1047,
  serialized_end=1400,
)

_RECIPE.fields_by_name['command'].message_type = _RECIPECOMMAND
_RECIPE.fields_by_name['glsl_shader_job_to_spirv_shader_job'].message_type = _RECIPEGLSLSHADERJOBTOSPIRVSHADERJOB
_RECIPE.fields_by_name['spirv_shader_job_to_spirv_shader_job_opt'].message_type = _RECIPESPIRVSHADERJOBTOSPIRVSHADERJOBOPT
_RECIPE.fields_by_name['glsl_shader_job_add_red_pixels'].message_type = _RECIPEGLSLSHADERJOBADDREDPIXELS
_RECIPE.fields_by_name['spirv_asm_shader_job_to_amber_script'].message_type = _RECIPESPIRVASMSHADERJOBTOAMBERSCRIPT
_RECIPE.fields_by_name['spirv_shader_job_to_spirv_asm_shader_job'].message_type = _RECIPESPIRVSHADERJOBTOSPIRVASMSHADERJOB
_RECIPE.oneofs_by_name['recipe'].fields.append(
  _RECIPE.fields_by_name['command'])
_RECIPE.fields_by_name['command'].containing_oneof = _RECIPE.oneofs_by_name['recipe']
_RECIPE.oneofs_by_name['recipe'].fields.append(
  _RECIPE.fields_by_name['glsl_shader_job_to_spirv_shader_job'])
_RECIPE.fields_by_name['glsl_shader_job_to_spirv_shader_job'].containing_oneof = _RECIPE.oneofs_by_name['recipe']
_RECIPE.oneofs_by_name['recipe'].fields.append(
  _RECIPE.fields_by_name['spirv_shader_job_to_spirv_shader_job_opt'])
_RECIPE.fields_by_name['spirv_shader_job_to_spirv_shader_job_opt'].containing_oneof = _RECIPE.oneofs_by_name['recipe']
_RECIPE.oneofs_by_name['recipe'].fields.append(
  _RECIPE.fields_by_name['glsl_shader_job_add_red_pixels'])
_RECIPE.fields_by_name['glsl_shader_job_add_red_pixels'].containing_oneof = _RECIPE.oneofs_by_name['recipe']
_RECIPE.oneofs_by_name['recipe'].fields.append(
  _RECIPE.fields_by_name['spirv_asm_shader_job_to_amber_script'])
_RECIPE.fields_by_name['spirv_asm_shader_job_to_amber_script'].containing_oneof = _RECIPE.oneofs_by_name['recipe']
_RECIPE.oneofs_by_name['recipe'].fields.append(
  _RECIPE.fields_by_name['spirv_shader_job_to_spirv_asm_shader_job'])
_RECIPE.fields_by_name['spirv_shader_job_to_spirv_asm_shader_job'].containing_oneof = _RECIPE.oneofs_by_name['recipe']
DESCRIPTOR.message_types_by_name['Recipe'] = _RECIPE
DESCRIPTOR.message_types_by_name['RecipeCommand'] = _RECIPECOMMAND
DESCRIPTOR.message_types_by_name['RecipeGlslShaderJobToSpirvShaderJob'] = _RECIPEGLSLSHADERJOBTOSPIRVSHADERJOB
DESCRIPTOR.message_types_by_name['RecipeSpirvShaderJobToSpirvShaderJobOpt'] = _RECIPESPIRVSHADERJOBTOSPIRVSHADERJOBOPT
DESCRIPTOR.message_types_by_name['RecipeGlslShaderJobAddRedPixels'] = _RECIPEGLSLSHADERJOBADDREDPIXELS
DESCRIPTOR.message_types_by_name['RecipeSpirvShaderJobToSpirvAsmShaderJob'] = _RECIPESPIRVSHADERJOBTOSPIRVASMSHADERJOB
DESCRIPTOR.message_types_by_name['RecipeSpirvAsmShaderJobToAmberScript'] = _RECIPESPIRVASMSHADERJOBTOAMBERSCRIPT
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Recipe = _reflection.GeneratedProtocolMessageType('Recipe', (_message.Message,), dict(
  DESCRIPTOR = _RECIPE,
  __module__ = 'gfauto.recipe_pb2'
  # @@protoc_insertion_point(class_scope:gfauto.Recipe)
  ))
_sym_db.RegisterMessage(Recipe)

RecipeCommand = _reflection.GeneratedProtocolMessageType('RecipeCommand', (_message.Message,), dict(
  DESCRIPTOR = _RECIPECOMMAND,
  __module__ = 'gfauto.recipe_pb2'
  # @@protoc_insertion_point(class_scope:gfauto.RecipeCommand)
  ))
_sym_db.RegisterMessage(RecipeCommand)

RecipeGlslShaderJobToSpirvShaderJob = _reflection.GeneratedProtocolMessageType('RecipeGlslShaderJobToSpirvShaderJob', (_message.Message,), dict(
  DESCRIPTOR = _RECIPEGLSLSHADERJOBTOSPIRVSHADERJOB,
  __module__ = 'gfauto.recipe_pb2'
  # @@protoc_insertion_point(class_scope:gfauto.RecipeGlslShaderJobToSpirvShaderJob)
  ))
_sym_db.RegisterMessage(RecipeGlslShaderJobToSpirvShaderJob)

RecipeSpirvShaderJobToSpirvShaderJobOpt = _reflection.GeneratedProtocolMessageType('RecipeSpirvShaderJobToSpirvShaderJobOpt', (_message.Message,), dict(
  DESCRIPTOR = _RECIPESPIRVSHADERJOBTOSPIRVSHADERJOBOPT,
  __module__ = 'gfauto.recipe_pb2'
  # @@protoc_insertion_point(class_scope:gfauto.RecipeSpirvShaderJobToSpirvShaderJobOpt)
  ))
_sym_db.RegisterMessage(RecipeSpirvShaderJobToSpirvShaderJobOpt)

RecipeGlslShaderJobAddRedPixels = _reflection.GeneratedProtocolMessageType('RecipeGlslShaderJobAddRedPixels', (_message.Message,), dict(
  DESCRIPTOR = _RECIPEGLSLSHADERJOBADDREDPIXELS,
  __module__ = 'gfauto.recipe_pb2'
  # @@protoc_insertion_point(class_scope:gfauto.RecipeGlslShaderJobAddRedPixels)
  ))
_sym_db.RegisterMessage(RecipeGlslShaderJobAddRedPixels)

RecipeSpirvShaderJobToSpirvAsmShaderJob = _reflection.GeneratedProtocolMessageType('RecipeSpirvShaderJobToSpirvAsmShaderJob', (_message.Message,), dict(
  DESCRIPTOR = _RECIPESPIRVSHADERJOBTOSPIRVASMSHADERJOB,
  __module__ = 'gfauto.recipe_pb2'
  # @@protoc_insertion_point(class_scope:gfauto.RecipeSpirvShaderJobToSpirvAsmShaderJob)
  ))
_sym_db.RegisterMessage(RecipeSpirvShaderJobToSpirvAsmShaderJob)

RecipeSpirvAsmShaderJobToAmberScript = _reflection.GeneratedProtocolMessageType('RecipeSpirvAsmShaderJobToAmberScript', (_message.Message,), dict(
  DESCRIPTOR = _RECIPESPIRVASMSHADERJOBTOAMBERSCRIPT,
  __module__ = 'gfauto.recipe_pb2'
  # @@protoc_insertion_point(class_scope:gfauto.RecipeSpirvAsmShaderJobToAmberScript)
  ))
_sym_db.RegisterMessage(RecipeSpirvAsmShaderJobToAmberScript)


# @@protoc_insertion_point(module_scope)
