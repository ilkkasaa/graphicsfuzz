
# Slide


# Shader jobs (intel_mesa_wrong_image_demo)

* .json file, plus associated shaders with same name: .vert, .frag, .comp.
* Two types of shader jobs: graphics (.frag [and .vert]) and compute (.comp)
* Graphics: render 256x256 quad using the shaders. Uniforms are defined in .json.

* GraphicsFuzz starts with a reference shader job.
  * Applies hundreds of transformations to give a variant.
  * Variant should render the same image; the mutations preserve the semantics.
  * Mention the macros.

* Run them with runspv. Need `amber` on `PATH`.

```
runspv host reference.json temp/reference_out/ --use-amberscript

```

* Look at out directory.
* No need to look at amber file yet.

```
runspv host variant_008.json temp/variant_008_out/ --use-amberscript
code --diff reference.frag variant_008_reduced_final.frag

# The reducer has removed nearly all transformations.

runspv host variant_008_reduced_final.json temp/variant_008_reduced_final_out/ --use-amberscript

```

* If a variant causes a crash, we can reduce further (without `--preserve-semantics` flag)
  * Reducer can remove arbitrary chunks of code.
  * gfauto only finds crash bugs at the moment.
    * It generates a variant. Runs it.


# Fuzzing for a crash bug end-to-end with gfauto

* I have GraphicsFuzz (`dev` branch) built and on my `PATH`.
  * `glsl-generate -h`
  * Try using openjdk 8 if you have issues:
    * export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64
    * export PATH=/usr/lib/jvm/java-1.8.0-openjdk-amd64/bin:$PATH
* I have `amber` on my `PATH`.
* I have `catchsegv` (from package manager) installed and on my `PATH`.
* Change to a directory outside of version control.

```
touch ROOT
mkdir aug_16
cd aug_16

# Activate virtual Python environment.

source /data/git/gfauto/gfauto/.venv/bin/activate

# Copy in sample shader jobs.

mkdir donors
cp /data/git/graphicsfuzz/shaders/src/main/glsl/samples/310es/* donors/

gfauto_fuzz

# ^ fails. Modify the generated `settings.json` file to pick which devices to fuzz.
# Start with host_preprocessor and host.

gfauto_fuzz

```

* Downloads binaries to `binaries` (next to the `ROOT` file).
* Generates a shader and tests it.
  * Creates a directory in `temp/`.
  * The directory will be deleted once the shader has been tested, but if gfauto dies, the directory will remain for inspection.
  * If a bug was found, a directory in `reports/` will be created.
* Look at some left-over `temp/` directories.
* Look at `reports/`.
  * Crashes and tool crashes.
* Puts them into buckets: each bucket is the crash signature.
* Signature: some string extracted from the log. Usually the top function from the stack trace, or the error message.

* Copy summary directories to repo where we store bugs.
* See `intel_mesa_vk_icdNegotiateLoaderICDInterfaceVersion`.
* You will probably then need to tweak the GLSL.
  * Check (and remove?) for infinite loops, so that it runs on most devices.
  * Add `color = red;`
* You can run using `gfauto_interestingness_test`: this will use the `test.json` to use the specific versions of binaries (e.g. `glslangValidator`) and run on the original device only.
* For CTS, the .amber file needs some additional details:
  * Short description.
  * Copyright header.
  * Extra commands to check the output color.
* We copy the "generate_cts_test.py" from the gfauto source tree into the bug directory.
* I sym-link my "bugs" repo into the gfauto source tree so my IDE can show me all uses of gfauto functions.
* Modify `generate_cts_test.py`. Add name, extra commands, etc.
* Run it: `python generate_cts_test.py` (under gfauto virtual environment).
* Execute `add_amber_tests_to_cts /data/gerrit/vk-gl-cts nested-loop-return.amber [...additional amber files that contain a short description comment]`


# Back to wrong image example (intel_mesa_wrong_image_demo)

* Try `python generate_cts_test_template.py` (under gfauto virtual environment).
* It generates `combined.amber`, but actually only renders the variant shader.

* We may also want more than two buffers; we may want to include an unsuccessful reduction as well: see `variant_008_reduced_0092_fail.json`.

* See `combined_EXAMPLE_*.amber` for how it should look.
* See `amber_converter.py` (`amber_converter.spirv_asm_shader_job_to_amber_script`) for where to get started.
