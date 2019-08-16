; SPIR-V
; Version: 1.0
; Generator: Khronos Glslang Reference Front End; 7
; Bound: 35
; Schema: 0
               OpCapability Shader
          %1 = OpExtInstImport "GLSL.std.450"
               OpMemoryModel Logical GLSL450
               OpEntryPoint Fragment %4 "main"
               OpExecutionMode %4 OriginUpperLeft
               OpSource ESSL 310
               OpName %4 "main"
          %2 = OpTypeVoid
          %3 = OpTypeFunction %2
          %6 = OpTypeInt 32 1
          %7 = OpConstant %6 1
          %8 = OpTypeFloat 32
          %9 = OpTypeVector %8 4
         %10 = OpTypeMatrix %9 3
         %11 = OpConstant %8 1
         %12 = OpConstant %8 0
         %13 = OpConstantComposite %9 %11 %12 %12 %12
         %14 = OpConstantComposite %9 %12 %11 %12 %12
         %15 = OpConstantComposite %9 %12 %12 %11 %12
         %16 = OpConstantComposite %10 %13 %14 %15
         %22 = OpTypeBool
         %23 = OpConstantTrue %22
         %30 = OpTypeVector %6 3
         %31 = OpConstant %6 93718
         %32 = OpConstant %6 42237
         %33 = OpConstant %6 87878
         %34 = OpConstantComposite %30 %31 %32 %33
          %4 = OpFunction %2 None %3
          %5 = OpLabel
               OpBranch %17
         %17 = OpLabel
               OpLoopMerge %19 %20 None
               OpBranch %21
         %21 = OpLabel
               OpBranchConditional %23 %18 %19
         %18 = OpLabel
               OpBranch %24
         %24 = OpLabel
               OpLoopMerge %26 %27 None
               OpBranch %28
         %28 = OpLabel
               OpBranchConditional %23 %25 %26
         %25 = OpLabel
               OpBranch %27
         %27 = OpLabel
               OpBranch %24
         %26 = OpLabel
               OpReturn
         %20 = OpLabel
               OpBranch %17
         %19 = OpLabel
               OpReturn
               OpFunctionEnd
