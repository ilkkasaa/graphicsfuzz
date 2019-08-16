#version 310 es

#ifndef REDUCER
#define _GLF_ZERO(X, Y)          (Y)
#define _GLF_ONE(X, Y)           (Y)
#define _GLF_FALSE(X, Y)         (Y)
#define _GLF_TRUE(X, Y)          (Y)
#define _GLF_IDENTITY(X, Y)      (Y)
#define _GLF_DEAD(X)             (X)
#define _GLF_FUZZED(X)           (X)
#define _GLF_WRAPPED_LOOP(X)     X
#define _GLF_WRAPPED_IF_TRUE(X)  X
#define _GLF_WRAPPED_IF_FALSE(X) X
#define _GLF_SWITCH(X)           X
#endif

// END OF GENERATED HEADER
precision highp float;

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
 vec2 injectionSwitch;
};
layout(set = 0, binding = 1) uniform buf1 {
 vec2 resolution;
};
struct BST {
 int data;
 int leftIndex;
 int rightIndex;
} ;

BST tree[10];

layout(set = 0, binding = 2) uniform buf2 {
 vec2 GLF_dead0injectionSwitch;
};
struct BinarySearchObject {
 int prime_numbers[10];
} ;

layout(set = 0, binding = 3) uniform buf3 {
 float GLF_dead7time;
};
float GLF_dead7h_r;

float GLF_dead7s_g;

float GLF_dead7b_b;

mediump vec4 GLF_dead11gl_FragCoord;

layout(set = 0, binding = 4) uniform buf4 {
 vec2 GLF_dead11resolution;
};
bool GLF_dead11checkSwap(float GLF_dead11a, float GLF_dead11b)
{
 return GLF_dead11gl_FragCoord.y < GLF_dead11resolution.y / 2.0 ? GLF_dead11a > GLF_dead11b : GLF_dead11a < GLF_dead11b;
}
struct Obj {
 float odd_numbers[10];
 float even_numbers[10];
} ;

void GLF_dead7doConvert()
{
 vec3 GLF_dead7temp;
 if(_GLF_DEAD(false))
  return;
 GLF_dead7temp = GLF_dead7b_b * (1.0 - GLF_dead7s_g) + (GLF_dead7b_b - GLF_dead7b_b * (1.0 - GLF_dead7s_g)) * clamp(abs(abs(6.0 * (GLF_dead7h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
 GLF_dead7h_r = GLF_dead7temp.x;
 GLF_dead7s_g = GLF_dead7temp.y;
 if(_GLF_DEAD(false))
  {
   int donor_replacementGLF_dead8i = _GLF_FUZZED(60088);
   if(float(donor_replacementGLF_dead8i) >= GLF_dead7b_b)
    {
     GLF_dead7s_g;
    }
  }
 GLF_dead7b_b = GLF_dead7temp.z;
}
vec3 GLF_dead7computeColor(float GLF_dead7c, vec2 GLF_dead7position)
{
 GLF_dead7h_r = fract(GLF_dead7c);
 GLF_dead7s_g = 1.0;
 GLF_dead7b_b = (0.5 + (sin(GLF_dead7time) * 0.5 + 0.5));
 GLF_dead7doConvert();
 GLF_dead7s_g *= 1.0 / GLF_dead7position.y;
 GLF_dead7h_r *= 1.0 / GLF_dead7position.x;
 if(abs(GLF_dead7position.y - GLF_dead7position.x) < 0.5)
  {
   switch(_GLF_SWITCH(0))
    {
     case 85:
     (123694u & uvec4(19524u, 146769u, 193711u, 130491u));
     case 0:
     if(_GLF_DEAD(false))
      return vec3(1.0);
     case 42:
     case 16:
     GLF_dead7b_b = clamp(0.0, 1.0, GLF_dead7b_b * 3.0);
     if(_GLF_DEAD(false))
      {
       vec4 donor_replacementGLF_dead9_GLF_color = _GLF_FUZZED(tanh(step(_GLF_color, _GLF_color)));
       float donor_replacementGLF_dead9data[10];
       int donor_replacementGLF_dead9msb9 = _GLF_FUZZED(64644);
       {
        donor_replacementGLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9data[(findLSB(32)) >= 0 && (findLSB(32)) < 10 ? findLSB(32) : 0] / 10.0, donor_replacementGLF_dead9data[(findMSB(donor_replacementGLF_dead9msb9)) >= 0 && (findMSB(donor_replacementGLF_dead9msb9)) < 10 ? findMSB(donor_replacementGLF_dead9msb9) : 0] / 10.0, donor_replacementGLF_dead9data[(findMSB(1)) >= 0 && (findMSB(1)) < 10 ? findMSB(1) : 0] / 10.0, 1.0);
       }
      }
     break;
     case 63:
     mat2x3 _GLF_SWITCH_2_0v, _GLF_SWITCH_2_1v, _GLF_SWITCH_2_2v;
     default:
     1;
    }
  }
 return vec3(GLF_dead7h_r, GLF_dead7s_g, GLF_dead7b_b);
}
float GLF_dead0compute_derivative_x(float GLF_dead0v)
{
 return dFdx(GLF_dead0v) * GLF_dead0injectionSwitch.y;
}
float GLF_dead0compute_derivative_y(float GLF_dead0v)
{
 return dFdy(GLF_dead0v) * GLF_dead0injectionSwitch.y;
}
float GLF_dead0compute_stripe(float GLF_dead0v)
{
 return smoothstep(- .9, 1., (GLF_dead0v) / ((GLF_dead0injectionSwitch.y > GLF_dead0injectionSwitch.x) ? GLF_dead0compute_derivative_x(_GLF_IDENTITY(GLF_dead0v, max(GLF_dead0v, GLF_dead0v))) : GLF_dead0compute_derivative_y(GLF_dead0v)));
}
void makeTreeNode(inout BST tree, int data)
{
 tree.data = data;
 _GLF_IDENTITY(tree.leftIndex = - 1, (tree.leftIndex = - 1) - 0);
 if(_GLF_WRAPPED_IF_TRUE(true))
  {
   switch(_GLF_SWITCH(0))
    {
     case 0:
     case 54:
     case 86:
     tree.rightIndex = - 1;
     break;
     case 67:
     for(
         mat4x3 _GLF_SWITCH_1_0v[18], _GLF_SWITCH_1_1v, _GLF_SWITCH_1_2v[29];
         (119828u == _GLF_IDENTITY((true ? 152277u : 107792u), (_GLF_IDENTITY((true ? 152277u : 107792u), 1u * ((true ? 152277u : 107792u)))) - (uint(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(uint(3u), uint(3u)))));
         bvec2(true, true)
     )
      {
       if((mat2x4(3.1, - 3485.1197, 5.2, _GLF_IDENTITY(- 1.3, min(_GLF_IDENTITY(- 1.3, 1.0 * (- 1.3)), - 1.3)), 52.48, - 0.1, - 8206.9924, 1.8) == mat2x4(- 4.7, - 9947.8870, 54.68, 5381.0883, - 97.59, 20.78, - 4.8, 11.72)))
        {
         61611u;
         161207u;
         mat4(92.60, 45.50, 5.7, - 7817.3949, - 4.7, 5.6, - 79.53, 5.9, 448.071, 29.61, - 8.8, 2.7, - 2.8, - 778.603, - 5397.9791, - 15.47);
         (uvec2(47577u, 8422u) * 153861u);
         ivec2 _GLF_SWITCH_1_3v[89], _GLF_SWITCH_1_4v[47];
        }
       else
        {
         discard;
         bvec3(false, true, true);
        }
       _GLF_SWITCH_1_1v;
       (- vec3(2.1, - 7.0, 3.7));
       vec4 _GLF_SWITCH_1_5v;
       uvec3 _GLF_SWITCH_1_6v, _GLF_SWITCH_1_7v, _GLF_SWITCH_1_8v;
       mat3x2 _GLF_SWITCH_1_9v, _GLF_SWITCH_1_10v;
       if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
        {
         if(data >= int(GLF_dead0injectionSwitch.x))
          {
           break;
          }
         if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
          continue;
        }
       ;
       min(findLSB(ivec2(21824, - 31610)), data);
       discard;
      }
     case 39:
     for(
         vec4 _GLF_SWITCH_1_11v[26], _GLF_SWITCH_1_12v;
         true;
         (data ^ data)
     )
      {
      }
     default:
     1;
    }
  }
 else
  {
  }
}
void insert(int treeIndex, int data)
{
 int baseIndex = 0;
 do
  {
   if(_GLF_DEAD(false))
    {
     vec4 donor_replacementGLF_dead9_GLF_color = _GLF_FUZZED(atanh(_GLF_color));
     float donor_replacementGLF_dead9data[10];
     mediump vec4 donor_replacementGLF_dead9gl_FragCoord = _GLF_FUZZED(vec4(948.203, 7.9, - 36.60, - 3.8));
     if(donor_replacementGLF_dead9gl_FragCoord.x < GLF_dead0injectionSwitch.x / 2.0)
      {
       if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
        return;
       donor_replacementGLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9data[(findMSB(1)) >= 0 && (findMSB(1)) < 10 ? findMSB(1) : 0] / 10.0, donor_replacementGLF_dead9data[(findLSB(32)) >= 0 && (findLSB(32)) < 10 ? findLSB(32) : 0] / 10.0, donor_replacementGLF_dead9data[(findMSB(treeIndex)) >= 0 && (findMSB(treeIndex)) < 10 ? findMSB(treeIndex) : 0] / 10.0, 1.0);
      }
     else
      {
       donor_replacementGLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9data[(findLSB(32)) >= 0 && (findLSB(32)) < 10 ? findLSB(32) : 0] / 10.0, donor_replacementGLF_dead9data[(findMSB(treeIndex)) >= 0 && (findMSB(treeIndex)) < 10 ? findMSB(treeIndex) : 0] / 10.0, donor_replacementGLF_dead9data[(findMSB(1)) >= 0 && (findMSB(1)) < 10 ? findMSB(1) : 0] / 10.0, 1.0);
      }
    }
   if(_GLF_DEAD(_GLF_FALSE(_GLF_IDENTITY(false, ! (_GLF_IDENTITY(! (false), ! (! (! (false)))))), (_GLF_IDENTITY(injectionSwitch.x, max(injectionSwitch.x, injectionSwitch.x)) > injectionSwitch.y))))
    {
     switch(_GLF_SWITCH((0 >> _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), (int(5)) << 0)))))
      {
       case 25:
       for(
           bvec4 _GLF_SWITCH_1_0v;
           (uvec3(25765u, 89032u, 180992u) == uvec3(23016u, 199605u, 8294u));
           (mat3x2(- 35.87, 5.4, - 1.6, 721.049, - 2.4, - 8.0) * mat2x3(2.7, 489.967, - 94.83, 4.3, 4.3, 2606.9749))
       )
        {
         ;
         mat3x4(5.4, - 551.690, 933.694, 7.2, 234.212, - 9.4, 2.4, 5.5, 3.0, - 808.230, 6.4, - 273.375);
         if((data < data))
          {
           uvec2 _GLF_SWITCH_1_1v, _GLF_SWITCH_1_2v;
           if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
            {
             Obj donor_replacementGLF_dead10obj;
             {
              if(donor_replacementGLF_dead10obj.even_numbers[(baseIndex) >= 0 && (baseIndex) < 10 ? baseIndex : 0] < donor_replacementGLF_dead10obj.even_numbers[(baseIndex) >= 0 && (baseIndex) < 10 ? baseIndex : 0])
               {
                baseIndex = baseIndex;
               }
             }
            }
           {
            bool _GLF_SWITCH_1_3v;
            bool _GLF_SWITCH_1_4v[67], _GLF_SWITCH_1_5v;
            mat3x4 _GLF_SWITCH_1_6v, _GLF_SWITCH_1_7v, _GLF_SWITCH_1_8v[61];
            bvec4(true, true, true, false).zxy;
           }
           bvec3 _GLF_SWITCH_1_9v[21], _GLF_SWITCH_1_10v[87], _GLF_SWITCH_1_11v;
           mat3 _GLF_SWITCH_1_12v[42], _GLF_SWITCH_1_13v[42], _GLF_SWITCH_1_14v[65];
           ivec4 _GLF_SWITCH_1_15v;
           vec3(129.361, 4.8, 9480.4389);
           ;
          }
         else
          {
           ivec2(52823, - 49268);
           if(_GLF_DEAD(false))
            return;
          }
         if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
          break;
         for(
             mat2 _GLF_SWITCH_1_16v, _GLF_SWITCH_1_17v, _GLF_SWITCH_1_18v;
             (- 34632 < data);
             step(1847.9423, - 84.99)
         )
          {
           uvec2(51574u, 11000u);
           do
            {
             vec3 _GLF_SWITCH_1_19v[93], _GLF_SWITCH_1_20v, _GLF_SWITCH_1_21v;
             ;
             bvec2 _GLF_SWITCH_1_22v;
             vec4 _GLF_SWITCH_1_23v, _GLF_SWITCH_1_24v, _GLF_SWITCH_1_25v[1];
             if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
              break;
            }
           while(true);
           while(true)
            {
             findLSB((uvec4(52964u, 108052u, 25458u, 25375u) & 197507u));
             (_GLF_SWITCH_1_0v);
             mat2x4(- 8015.8629, 4.5, - 8.2, - 4.8, - 557.653, 17.80, - 18.79, - 2.0);
             mat4x3 _GLF_SWITCH_1_26v, _GLF_SWITCH_1_27v, _GLF_SWITCH_1_28v[42];
             ;
             if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
              discard;
             uvec4 _GLF_SWITCH_1_29v, _GLF_SWITCH_1_30v[65];
             ivec3 _GLF_SWITCH_1_31v;
             if(_GLF_DEAD(false))
              return;
             fwidth(_GLF_color);
            }
          }
         {
          uint _GLF_SWITCH_1_32v[13];
          for(
              mat4x2(- 5.0, - 1896.7693, - 6.1, - 679.422, - 1469.1972, 4153.3474, 77.88, - 843.405);
              (ivec2(- 26807, - 94908) != (baseIndex - ivec2(- 61154, 86232)));
              mat4x2(760.391, - 35.83, 0.9, 2.1, - 22.89, 7300.1018, _GLF_IDENTITY(- 1404.9180, max(- 1404.9180, _GLF_IDENTITY(- 1404.9180, min(- 1404.9180, - 1404.9180)))), - 8.8)
          )
           {
            mat2x3 _GLF_SWITCH_1_33v, _GLF_SWITCH_1_34v;
            vec3(3.5, 9.2, 80.15).y;
            bool _GLF_SWITCH_1_35v, _GLF_SWITCH_1_36v;
            ivec3(- 46742, 27897, - 50858);
            2.2;
            discard;
           }
          vec2 _GLF_SWITCH_1_37v[16], _GLF_SWITCH_1_38v;
          (2.4 / mat3x2(87.09, - 5.4, 3344.8511, - 24.71, 91.20, 66.82));
          mat4x3 _GLF_SWITCH_1_39v[60], _GLF_SWITCH_1_40v;
          mat3(- 3.5, 5549.1020, 696.560, - 0.4, 82.59, - 73.62, 371.385, - 71.20, 5555.7047);
          if(_GLF_DEAD(false))
           break;
          float _GLF_SWITCH_1_41v;
         }
         while(((192475u * 107217u) < 159267u))
          {
           while(true)
            {
             ivec3 _GLF_SWITCH_1_42v, _GLF_SWITCH_1_43v[65], _GLF_SWITCH_1_44v;
             ;
             mat2x3(mat4x2(243.398, - 50.08, 2.2, - 71.57, - 734.941, - 6358.3118, - 63.88, 5.3));
             uintBitsToFloat(149361u);
             injectionSwitch;
             mat2x4 _GLF_SWITCH_1_45v, _GLF_SWITCH_1_46v;
             bvec4 _GLF_SWITCH_1_47v, _GLF_SWITCH_1_48v, _GLF_SWITCH_1_49v[26];
             if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
              {
               float donor_replacementGLF_dead5alpha3 = _GLF_FUZZED(- 84.47);
               vec4 donor_replacementGLF_dead5matrix_b = _GLF_FUZZED(vec4(- 36.30, - 178.816, 9109.5719, 1.1));
               vec4 donor_replacementGLF_dead5matrix_u = _GLF_FUZZED(vec4(- 1.5, 425.002, - 6.7, - 6342.4901));
               {
                donor_replacementGLF_dead5alpha3 += donor_replacementGLF_dead5matrix_u[(baseIndex) >= 0 && (baseIndex) < 4 ? baseIndex : 0] * donor_replacementGLF_dead5matrix_b[(baseIndex) >= 0 && (baseIndex) < 4 ? _GLF_IDENTITY(baseIndex, (baseIndex) >> int(_GLF_ZERO(0.0, injectionSwitch.x))) : 0];
               }
              }
             bvec4 _GLF_SWITCH_1_50v[65];
            }
           mat4 _GLF_SWITCH_1_51v, _GLF_SWITCH_1_52v[57];
           mat2(- 225.118, - 4461.0227, 1955.1140, - 4.8);
           while((mat3x2(- 6252.6303, 9.3, - 7750.9101, 2.2, - 5.9, - 4803.3421) != (mat3x2(532.978, - 5.6, 8.1, 45.85, - 8.3, - 39.93) + 9.0)))
            {
            }
           ivec3(- 62820, 16502, 64198);
          }
         if(_GLF_DEAD(false))
          discard;
        }
       case 21:
       data;
       case 0:
       if(_GLF_DEAD(false))
        discard;
       return;
       if(_GLF_DEAD(false))
        {
         vec2 donor_replacementGLF_dead6size = _GLF_FUZZED(GLF_dead0injectionSwitch);
         vec2 donor_replacementGLF_dead6st = _GLF_FUZZED(resolution);
         vec2 donor_replacementGLF_dead6uv = _GLF_FUZZED(injectionSwitch);
         {
          ;
          mix(pow(donor_replacementGLF_dead6st.x, GLF_dead0injectionSwitch.y), donor_replacementGLF_dead6st.x, donor_replacementGLF_dead6size.y);
          if(_GLF_DEAD(false))
           {
            float donor_replacementGLF_dead11data[10];
            {
             float GLF_dead11temp = donor_replacementGLF_dead11data[(baseIndex) >= 0 && (baseIndex) < 10 ? baseIndex : 0];
             donor_replacementGLF_dead11data[(baseIndex) >= 0 && (baseIndex) < 10 ? baseIndex : 0] = donor_replacementGLF_dead11data[(treeIndex) >= 0 && (treeIndex) < 10 ? treeIndex : 0];
             donor_replacementGLF_dead11data[(treeIndex) >= 0 && (treeIndex) < 10 ? treeIndex : 0] = GLF_dead11temp;
            }
            if(_GLF_DEAD(false))
             return;
           }
          break;
          ;
          if(_GLF_DEAD(_GLF_IDENTITY(false, true && (false))))
           {
            {
             if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
              continue;
             GLF_dead7h_r += 0.2;
            }
           }
          mix(pow(donor_replacementGLF_dead6uv.y, GLF_dead0injectionSwitch.y), donor_replacementGLF_dead6st.y, donor_replacementGLF_dead6size.x);
          break;
          ;
          discard;
          break;
          ;
          mix(pow(donor_replacementGLF_dead6uv.y, GLF_dead0injectionSwitch.y), donor_replacementGLF_dead6uv.y, donor_replacementGLF_dead6size.y);
          if(_GLF_DEAD(false))
           discard;
          break;
          ;
          if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
           {
            uint donor_replacementGLF_dead9uselessOutVariable = _GLF_FUZZED((true ? (144960u ^ uvec4(74647u, 71752u, 27823u, 185858u)[3]) : 167796u));
            if(uint(baseIndex) < uaddCarry(uint(baseIndex), 1u, donor_replacementGLF_dead9uselessOutVariable))
             {
              continue;
             }
           }
          mix(pow(donor_replacementGLF_dead6st.y, GLF_dead0injectionSwitch.y), donor_replacementGLF_dead6st.x, donor_replacementGLF_dead6size.x);
          break;
         }
        }
       break;
       case 62:
       {
        ivec3 _GLF_SWITCH_1_53v, _GLF_SWITCH_1_54v, _GLF_SWITCH_1_55v;
        if(_GLF_DEAD(_GLF_IDENTITY(false, (false) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))))
         continue;
        {
         bvec2 _GLF_SWITCH_1_56v[61], _GLF_SWITCH_1_57v;
         while((bvec3(false, true, false)[1] == false))
          {
           switch(_GLF_SWITCH((0 >> _GLF_IDENTITY(int(0), int(0)))))
            {
             case 0:
             bvec2 _GLF_SWITCH_1_58v[84];
             break;
             case 12:
             mat2 _GLF_SWITCH_2_0v, _GLF_SWITCH_2_1v, _GLF_SWITCH_2_2v[20];
             default:
             1;
            }
          }
         uvec3 _GLF_SWITCH_1_59v[81];
         if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
          {
           if(treeIndex < data + 1)
            {
             continue;
            }
          }
         bvec3 _GLF_SWITCH_1_60v[21], _GLF_SWITCH_1_61v;
         ;
        }
        ;
        if(_GLF_DEAD(false))
         return;
        uint _GLF_SWITCH_1_62v, _GLF_SWITCH_1_63v[52];
        bitfieldExtract((~ uvec3(124680u, 74083u, 116354u)), treeIndex, data);
        while((ivec2(- 33442, - 69507) != ivec2(- 38954, - 26283)))
         {
          if(_GLF_DEAD(_GLF_IDENTITY(false, (false) || _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))
           {
            bool donor_replacementGLF_dead7c5 = _GLF_FUZZED(false);
            vec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((((mat2x3(7.8, 4.8, - 34.10, 51.84, - 9208.7305, - 6933.3492) * mat2(- 8.7, - 1.7, - 5.0, 49.01)) == mat2x3(- 2.2, - 9.0, - 909.632, - 8932.8670, 5659.5119, - 15.30)) ? resolution : resolution));
            vec3 donor_replacementGLF_dead7setting = _GLF_FUZZED(min(step(vec3(- 2105.4525, - 4.2, - 8440.3252), vec3(- 5995.2192, - 190.538, 4118.8621)), (exp(_GLF_color) * mat3x4(92.10, - 7916.6708, 9242.1244, 8837.1862, 7.3, - 952.674, 3301.1281, - 40.92, 2.3, - 4.3, 244.702, - 4.3))));
            if(! donor_replacementGLF_dead7c5)
             {
              GLF_dead7computeColor(donor_replacementGLF_dead7setting.z / 40.0, donor_replacementGLF_dead7pos);
             }
           }
         }
        ;
        if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
         discard;
        if(_GLF_DEAD(false))
         {
          mat4 donor_replacementGLF_dead5matrix_a = _GLF_FUZZED((6078.4146 / mat4(3265.8084, _GLF_IDENTITY(3.2, (true ? _GLF_IDENTITY(3.2, max(3.2, 3.2)) : _GLF_FUZZED(3459.3016))), 243.275, - 29.19, - 3836.1606, - 9007.2645, 492.957, - 4.8, - 4.5, 772.807, 3484.4255, 9.6, 7.3, - 990.567, - 8.1, - 1.6)));
          vec4 donor_replacementGLF_dead5matrix_b = _GLF_FUZZED((dFdy(determinant(mat2(- 2.3, 238.841, 960.657, - 631.847))) - vec4(- 4.4, - 12.68, - 963.690, - 0.6)));
          for(
              int GLF_dead5j = (baseIndex - 1);
              GLF_dead5j >= (_GLF_IDENTITY(data, (0 ^ 0) + (data)) + 1);
              GLF_dead5j --
          )
           {
            donor_replacementGLF_dead5matrix_b[(data) >= 0 && (data) < 4 ? data : 0] -= (donor_replacementGLF_dead5matrix_a[(data) >= 0 && (data) < 4 ? data : 0][(GLF_dead5j) >= 0 && (GLF_dead5j) < 4 ? GLF_dead5j : 0] * donor_replacementGLF_dead5matrix_b[(GLF_dead5j) >= 0 && (GLF_dead5j) < 4 ? GLF_dead5j : 0]);
           }
         }
        for(
            ivec4 _GLF_SWITCH_1_64v, _GLF_SWITCH_1_65v[95], _GLF_SWITCH_1_66v[64];
            true;
            mat4x2(8.7, 0.2, - 8.2, 0.4, - 6.9, 531.117, - 8416.7755, - 605.987)
        )
         {
          mat3(mat2(vec2(- 6.3, 8877.0225), GLF_dead0injectionSwitch));
          mat3x4 _GLF_SWITCH_1_67v, _GLF_SWITCH_1_68v, _GLF_SWITCH_1_69v;
          if((mat3(_GLF_IDENTITY(- 6903.8589, (- 6903.8589) / 1.0), - 6.3, 3.8, 2.1, - 86.30, - 3.1, - 2815.2586, - 2.9, - 6.1) != mat3(- 8.7, - 8.8, - 2067.0027, - 28.99, - 5.7, 68.46, - 28.71, - 93.06, 229.419)))
           {
            mat2(9737.5044, 177.733, - 5695.5597, 4.0);
            _GLF_color;
            uvec4 _GLF_SWITCH_1_70v, _GLF_SWITCH_1_71v;
            (- 4.1 + mat4(- 3.8, - 6.7, - 440.684, 271.098, 0.8, _GLF_IDENTITY(- 3.5, (- 3.5) / 1.0), 17.10, - 830.377, - 0.2, - 4.1, _GLF_IDENTITY(- 12.46, max(_GLF_IDENTITY(- 12.46, clamp(- 12.46, - 12.46, - 12.46)), - 12.46)), 944.673, 2.9, 3.7, - 906.213, 9691.2539));
            mat2x4(- 2.8, 1519.5125, 0.8, 34.88, 7.5, - 1.4, 0.4, 1.8);
            if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
             break;
            lessThan(findLSB(uvec3(59508u, 134054u, 140504u)), (_GLF_SWITCH_1_53v << baseIndex));
            injectionSwitch;
            mat4x2(- 5.2, 3286.2884, - 861.520, - 3.8, - 2539.6106, - 47.46, - 2985.5091, 7816.1027);
            bvec4 _GLF_SWITCH_1_72v, _GLF_SWITCH_1_73v[26];
           }
          vec3(- 5.3, 189.901, - 312.553);
          if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
           discard;
          bitfieldReverse((uvec2(60509u, 128296u) << uvec2(112232u, 36967u)));
          ;
          if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
           discard;
         }
        if(true)
         {
          uint _GLF_SWITCH_1_74v;
          (mat3x4(- 40.86, - 7.4, - 9.9, 1278.4418, 1.8, - 2.7, 1593.7629, - 2697.6200, 87.79, - 9.4, 99.43, 5.1) / 98.78);
          if((vec4(- 964.834, 0.5, 21.83, - 24.96) != vec4(- 2.0, - 3980.1440, - 86.45, 536.930)))
           {
           }
          else
           {
            mat2x3(- 4.3, 6701.6682, - 9169.1751, 4.8, - 669.651, - 0.7)[0];
            vec4(- 774.517, - 1.7, - 643.120, 8.1);
            ((- 384.228 >= 5.1) ? mat4x3(472.305, 0.8, 7.2, - 1.6, - 2567.3965, 4676.2739, 3.2, - 574.300, 0.7, 942.475, - 382.222, - 898.781) : mat4x3(- 0.2, - 8120.2074, - 33.57, 79.09, 791.416, 852.685, - 535.621, 44.42, 11.07, 393.759, 5.5, - 5349.3970));
            if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
             {
              {
               GLF_dead7b_b;
              }
             }
            (~ ivec4(8814, 25805, - 79922, - 87600));
           }
          if(_GLF_DEAD(false))
           {
            {
             continue;
            }
           }
          for(
              ivec4(41575, 87979, _GLF_IDENTITY(37969, (0 | 0) | (_GLF_IDENTITY(37969, max(37969, 37969)))), - 74212);
              ((4414.9944 / mat2x3(- 451.881, - 5621.6595, - 5024.8010, - 1.2, - 8957.0659, 83.82)) != (- mat2x3(- 8574.3988, 996.209, - 467.090, - 0.5, - 1.0, - 8015.6719)));
              (_GLF_SWITCH_1_74v | _GLF_SWITCH_1_62v)
          )
           {
            ;
            vec3(- 8.4, 4306.5939, 86.62);
            if(_GLF_DEAD(false))
             {
              int donor_replacementGLF_dead8i = _GLF_FUZZED(bitCount(uvec4(69931u, 72301u, 190994u, 48880u).g));
              float donor_replacementGLF_dead8ref = _GLF_FUZZED(GLF_dead7h_r);
              if(mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead8ref) <= 0.01)
               {
                GLF_dead7h_r += 0.2;
                if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
                 return;
               }
             }
            mat3x2(- 9.2, 2076.7688, - 885.599, 547.778, - 2.3, - 856.484);
           }
          ;
          for(
              3.5;
              (true || false);
              uvec3(101564u, 21400u, 31557u)
          )
           {
            mat3x4 _GLF_SWITCH_1_75v, _GLF_SWITCH_1_76v;
           }
          if((vec3(- 168.257, 9.9, 7623.2900) == vec3(17.38, - 9.0, - 2.8)))
           {
            ivec4(- 45354, - 53209, _GLF_IDENTITY(25820, (false ? _GLF_FUZZED(baseIndex) : 25820)), - 25654);
            ;
            outerProduct(vec3(16.27, 796.137, 2375.5343), vec3(- 4535.2260, 9369.8292, 27.18));
            _GLF_color;
            discard;
            uint _GLF_SWITCH_1_77v, _GLF_SWITCH_1_78v[28], _GLF_SWITCH_1_79v;
            mat4x2(1.4, 0.8, - 3262.9055, - 4.3, - 7.7, - 0.4, - 5891.2033, 132.121);
            vec4 _GLF_SWITCH_1_80v[12], _GLF_SWITCH_1_81v;
           }
          else
           {
            uvec4 _GLF_SWITCH_1_82v[92], _GLF_SWITCH_1_83v, _GLF_SWITCH_1_84v[37];
            if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
             {
              vec4 donor_replacementGLF_dead4_GLF_color = _GLF_FUZZED(_GLF_color.abgr);
              mediump vec4 donor_replacementGLF_dead4gl_FragCoord = _GLF_FUZZED(mat2x4(mat4x3(3600.9715, - 7611.6628, 9537.2249, 60.88, 204.923, - 8.8, 906.299, 8.0, - 5.3, - 896.720, - 342.708, 5337.2548))[1]);
              {
               float GLF_dead4A[50];
               for(
                   int GLF_dead4i = 0;
                   GLF_dead4i < 200;
                   GLF_dead4i ++
               )
                {
                 if(GLF_dead4i >= int(_GLF_IDENTITY(GLF_dead0injectionSwitch.x, (GLF_dead0injectionSwitch.x) / 1.0)))
                  {
                   break;
                  }
                 if((4 * (GLF_dead4i / 4)) == GLF_dead4i)
                  {
                   GLF_dead4A[(GLF_dead4i / 4) >= 0 && (GLF_dead4i / 4) < 50 ? GLF_dead4i / 4 : 0] = float(GLF_dead4i);
                  }
                }
               for(
                   int GLF_dead4i = 0;
                   GLF_dead4i < 50;
                   GLF_dead4i ++
               )
                {
                 if(GLF_dead4i < int(donor_replacementGLF_dead4gl_FragCoord.x))
                  {
                   break;
                  }
                 if(GLF_dead4i > 0)
                  {
                   GLF_dead4A[(GLF_dead4i) >= 0 && (GLF_dead4i) < 50 ? GLF_dead4i : 0] += GLF_dead4A[(GLF_dead4i - 1) >= 0 && (GLF_dead4i - 1) < 50 ? GLF_dead4i - 1 : 0];
                   if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
                    discard;
                  }
                }
               if(_GLF_DEAD(false))
                break;
               if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 20)
                {
                 if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
                  return;
                 donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[0] / GLF_dead0injectionSwitch.x, GLF_dead4A[4] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                }
               else
                if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 40)
                 {
                  donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[5] / GLF_dead0injectionSwitch.x, GLF_dead4A[9] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                 }
                else
                 if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 60)
                  {
                   switch(_GLF_SWITCH(0))
                    {
                     case 15:
                     GLF_dead7s_g;
                     case 0:
                     donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[10] / GLF_dead0injectionSwitch.x, GLF_dead4A[14] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                     break;
                     case 90:
                     distance(vec4(- 34.01, - 36.60, 0.4, - 43.20), donor_replacementGLF_dead4_GLF_color);
                     default:
                     1;
                    }
                  }
                 else
                  if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 80)
                   {
                    donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[15] / GLF_dead0injectionSwitch.x, GLF_dead4A[19] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                   }
                  else
                   if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 100)
                    {
                     donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[20] / GLF_dead0injectionSwitch.x, GLF_dead4A[24] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                    }
                   else
                    if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 120)
                     {
                      switch(_GLF_SWITCH(0))
                       {
                        case 86:
                        mat4(- 71.17, - 68.56, - 0.9, 490.582, 6004.3362, - 7338.8068, - 2.4, 96.95, - 3.7, 65.72, 2771.0280, 9.1, - 4967.7991, - 2.6, 5.2, 421.293);
                        case 33:
                        vec3 _GLF_SWITCH_2_0v[76];
                        case 0:
                        case 31:
                        case 50:
                        donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[25] / GLF_dead0injectionSwitch.x, GLF_dead4A[29] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                        break;
                        case 95:
                        mat3x4(9.8, 0.2, 665.353, 84.86, - 880.061, 9532.6876, - 934.218, - 8.8, 999.605, - 3.7, - 478.662, 494.932);
                        default:
                        1;
                       }
                     }
                    else
                     if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 140)
                      {
                       donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[30] / GLF_dead0injectionSwitch.x, GLF_dead4A[34] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                      }
                     else
                      if(int(_GLF_IDENTITY(donor_replacementGLF_dead4gl_FragCoord.x, clamp(donor_replacementGLF_dead4gl_FragCoord.x, donor_replacementGLF_dead4gl_FragCoord.x, donor_replacementGLF_dead4gl_FragCoord.x))) < 160)
                       {
                        donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[35] / GLF_dead0injectionSwitch.x, GLF_dead4A[39] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                       }
                      else
                       if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 180)
                        {
                         donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[40] / _GLF_IDENTITY(GLF_dead0injectionSwitch.x, (_GLF_IDENTITY(GLF_dead0injectionSwitch.x, (false ? _GLF_FUZZED(GLF_dead7b_b) : GLF_dead0injectionSwitch.x))) * 1.0), GLF_dead4A[44] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                        }
                       else
                        if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 180)
                         {
                          donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4A[45] / GLF_dead0injectionSwitch.x, GLF_dead4A[49] / GLF_dead0injectionSwitch.y, 1.0, 1.0);
                         }
                        else
                         {
                          discard;
                         }
              }
             }
            (- mat4(mat2x4(4.2, 4.3, 22.83, 35.58, - 478.357, 2078.5551, - 1.5, 2.9)));
            if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
             return;
            resolution.rg;
            if(_GLF_DEAD(false))
             break;
            (ivec2(- 35926, - 58791) ^ ivec2(54695, - 40626));
            uvec2(140609u, 144002u);
            ivec2(26481, 18330);
            mat2(- 202.337, 2187.9010, 119.954, 305.350);
            bvec4 _GLF_SWITCH_1_85v;
            bvec3 _GLF_SWITCH_1_86v[72];
            if(_GLF_DEAD(false))
             {
              vec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(resolution);
              vec3 donor_replacementGLF_dead7setting = _GLF_FUZZED(sqrt(vec3(- 6035.3060, 7.7, - 5855.5991)));
              {
               if(_GLF_DEAD(false))
                continue;
               GLF_dead7computeColor(donor_replacementGLF_dead7setting.z / 40.0, donor_replacementGLF_dead7pos);
              }
             }
            if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x)))))
             continue;
           }
          ivec3 _GLF_SWITCH_1_87v, _GLF_SWITCH_1_88v;
         }
        else
         {
          (clamp(ivec4(93233, 74124, 30027, - 10386), data, treeIndex) == ivec4(- 49822, - 81339, - 64679, - 7683));
          if(_GLF_DEAD(false))
           {
            float donor_replacementGLF_dead11data[10];
            int donor_replacementGLF_dead11i = _GLF_FUZZED(treeIndex);
            {
             for(
                 int GLF_dead11j = 0;
                 GLF_dead11j < 10;
                 GLF_dead11j ++
             )
              {
               if(GLF_dead11j < donor_replacementGLF_dead11i + 1)
                {
                 continue;
                }
               bool GLF_dead11doSwap = GLF_dead11checkSwap(donor_replacementGLF_dead11data[(donor_replacementGLF_dead11i) >= 0 && (donor_replacementGLF_dead11i) < 10 ? donor_replacementGLF_dead11i : 0], donor_replacementGLF_dead11data[(GLF_dead11j) >= 0 && (GLF_dead11j) < 10 ? GLF_dead11j : 0]);
               if(GLF_dead11doSwap)
                {
                 float GLF_dead11temp = donor_replacementGLF_dead11data[(donor_replacementGLF_dead11i) >= 0 && (donor_replacementGLF_dead11i) < 10 ? donor_replacementGLF_dead11i : 0];
                 donor_replacementGLF_dead11data[(donor_replacementGLF_dead11i) >= 0 && (donor_replacementGLF_dead11i) < 10 ? donor_replacementGLF_dead11i : 0] = donor_replacementGLF_dead11data[(GLF_dead11j) >= 0 && (GLF_dead11j) < 10 ? GLF_dead11j : 0];
                 donor_replacementGLF_dead11data[(GLF_dead11j) >= 0 && (GLF_dead11j) < 10 ? GLF_dead11j : 0] = GLF_dead11temp;
                }
              }
            }
           }
          if(_GLF_DEAD(false))
           break;
          {
           _GLF_IDENTITY(mat2(2139.5171, - 7744.9184, - 856.995, - 17.39), (_GLF_IDENTITY(mat2(2139.5171, - 7744.9184, - 856.995, - 17.39), transpose(transpose(_GLF_IDENTITY(mat2(2139.5171, - 7744.9184, - 856.995, - 17.39), (mat2(2139.5171, - 7744.9184, - 856.995, - 17.39)) - mat2(0.0, 0.0, 0.0, 0.0)))))) / mat2(1.0, 1.0, 1.0, 1.0));
           uvec2(96027u, 38528u);
           if(_GLF_DEAD(false))
            {
             int donor_replacementGLF_dead5a = _GLF_FUZZED(bitCount(baseIndex));
             float donor_replacementGLF_dead5alpha3 = _GLF_FUZZED(length(radians(_GLF_IDENTITY(- 5510.8752, min(_GLF_IDENTITY(- 5510.8752, min(- 5510.8752, - 5510.8752)), - 5510.8752)))));
             mat4 donor_replacementGLF_dead5matrix_a = _GLF_FUZZED(mat4(97.43, - 1.5, - 1.8, - 30.15, 95.17, 79.72, 6.8, 8.0, 2.4, 659.362, - 4037.2561, 17.72, - 13.72, 57.14, - 5146.3807, 6.7));
             if(_GLF_DEAD(false))
              discard;
             vec4 donor_replacementGLF_dead5matrix_u = _GLF_FUZZED(normalize(_GLF_color));
             {
              donor_replacementGLF_dead5alpha3 += donor_replacementGLF_dead5matrix_u[(donor_replacementGLF_dead5a) >= 0 && (donor_replacementGLF_dead5a) < 4 ? donor_replacementGLF_dead5a : 0] * donor_replacementGLF_dead5matrix_a[_GLF_IDENTITY((donor_replacementGLF_dead5a) >= 0 && (donor_replacementGLF_dead5a) < 4 ? donor_replacementGLF_dead5a : 0, (_GLF_IDENTITY((donor_replacementGLF_dead5a) >= 0 && (donor_replacementGLF_dead5a) < 4 ? donor_replacementGLF_dead5a : 0, ((donor_replacementGLF_dead5a) >= 0 && (donor_replacementGLF_dead5a) < 4 ? donor_replacementGLF_dead5a : 0) / 1)) - 0)][(data) >= 0 && (data) < 4 ? data : 0];
              if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0)))))
               discard;
             }
            }
           _GLF_SWITCH_1_54v;
           _GLF_SWITCH_1_55v;
           (mat2(413.604, - 295.231, - 9.0, 9511.2345) - distance(resolution, injectionSwitch));
          }
          mat3 _GLF_SWITCH_1_89v;
          for(
              mat3x2(_GLF_IDENTITY(76.38, clamp(76.38, 76.38, 76.38)), - 554.933, - 461.429, 5.5, 5.5, 542.296);
              (clamp(uvec2(88198u, 138817u), uvec2(75442u, 127634u), uvec2(118939u, 153704u)) == uvec2(70002u, 80818u));
              bitfieldInsert(uvec4(148969u, 30720u, 8622u, 63364u), uvec4(159047u), 62508, treeIndex)
          )
           {
            if(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, ! (_GLF_IDENTITY(! (injectionSwitch.x > injectionSwitch.y), ! (! (! (injectionSwitch.x > injectionSwitch.y))))))))))
             {
              int donor_replacementGLF_dead6a = _GLF_FUZZED((data --));
              mediump vec4 donor_replacementGLF_dead6gl_FragCoord = _GLF_FUZZED(_GLF_color);
              vec2 donor_replacementGLF_dead6uv = _GLF_FUZZED(injectionSwitch);
              do
               {
                donor_replacementGLF_dead6uv.y -= step(resolution.y, donor_replacementGLF_dead6uv.x) + float(donor_replacementGLF_dead6a);
                donor_replacementGLF_dead6uv.x *= (isnan(donor_replacementGLF_dead6uv.y) ? cosh(donor_replacementGLF_dead6gl_FragCoord.y) : tanh(donor_replacementGLF_dead6gl_FragCoord.x));
                data --;
               }
              while(data > int(resolution.x));
              if(_GLF_DEAD(false))
               {
                int donor_replacementGLF_dead8i = _GLF_FUZZED(data);
                {
                 if(_GLF_DEAD(false))
                  discard;
                 if(mod(float(donor_replacementGLF_dead8i), GLF_dead7b_b) <= 0.01)
                  {
                   GLF_dead7h_r += 0.2;
                  }
                 if(float(donor_replacementGLF_dead8i) >= GLF_dead7b_b)
                  {
                   switch(_GLF_SWITCH((0 << _GLF_IDENTITY(int(3), int(3)))))
                    {
                     case 90:
                     ivec4 _GLF_SWITCH_2_0v, _GLF_SWITCH_2_1v;
                     case 54:
                     bool _GLF_SWITCH_2_2v, _GLF_SWITCH_2_3v[41], _GLF_SWITCH_2_4v;
                     case 0:
                     case 76:
                     GLF_dead7h_r;
                     break;
                     case 29:
                     max(uvec2(184208u, 114323u), uvec2(192804u, 196646u));
                     case 26:
                     ivec2(- 65045, 46230);
                     default:
                     1;
                    }
                   if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
                    return;
                  }
                 donor_replacementGLF_dead8i ++;
                }
               }
             }
            ivec4(- 44874, - 39467, - 56422, - 21392);
            (mat2(mat2x4(- 6.7, 1.9, 9.7, 2.6, - 442.164, - 331.802, 1036.7625, - 6.0)) + 7969.1545);
            mat4(_GLF_IDENTITY(57.03, max(_GLF_IDENTITY(57.03, (false ? _GLF_FUZZED(GLF_dead7b_b) : 57.03)), _GLF_IDENTITY(57.03, max(57.03, _GLF_IDENTITY(57.03, mix(float(_GLF_FUZZED(600.314)), float(57.03), bool(true))))))), - 8.5, - 1437.0034, - 39.42, 4.0, 2672.8806, - 814.704, 4.0, 4.3, - 181.698, - 3.3, - 79.61, 5.4, - 5.6, 0.9, - 8.6);
            vec3(- 794.257, - 984.799, 13.62);
            mat4 _GLF_SWITCH_1_90v, _GLF_SWITCH_1_91v[51], _GLF_SWITCH_1_92v;
            42918;
            bvec2 _GLF_SWITCH_1_93v[97], _GLF_SWITCH_1_94v;
           }
          while(true)
           {
           }
          ivec4 _GLF_SWITCH_1_95v, _GLF_SWITCH_1_96v[30];
          if(bvec2(true, true)[1])
           {
            ;
            mat4x3 _GLF_SWITCH_1_97v;
            min(- 5700.5995, 9.8);
            _GLF_SWITCH_1_89v;
            if(_GLF_DEAD(false))
             return;
            ;
            uvec4 _GLF_SWITCH_1_98v, _GLF_SWITCH_1_99v[75];
            discard;
            ;
            discard;
           }
          else
           {
            vec3(- 1.1, - 39.56, 284.593);
            outerProduct(resolution, injectionSwitch);
           }
         }
       }
       default:
       1;
      }
     if(_GLF_DEAD(false))
      {
       uint donor_replacementGLF_dead9uselessOutVariable = _GLF_FUZZED(packSnorm2x16(ceil(injectionSwitch)));
       if(uint(baseIndex) < uaddCarry(uint(data), 1u, donor_replacementGLF_dead9uselessOutVariable))
        {
         continue;
        }
      }
    }
  }
 while(_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
 while(baseIndex <= treeIndex)
  {
   if(data <= tree[baseIndex].data)
    {
     if(tree[baseIndex].leftIndex == - 1)
      {
       if(_GLF_DEAD(false))
        return;
       if(_GLF_WRAPPED_IF_FALSE(false))
        {
        }
       else
        {
         tree[baseIndex].leftIndex = treeIndex;
        }
       makeTreeNode(tree[treeIndex], _GLF_IDENTITY(data, 0 ^ (_GLF_IDENTITY(data, (data) | 0))));
       if(_GLF_WRAPPED_IF_TRUE(true))
        {
         return;
        }
       else
        {
        }
      }
     else
      {
       if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x), ! (! (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))))))
        {
         baseIndex = tree[baseIndex].leftIndex;
        }
       else
        {
        }
       continue;
      }
    }
   else
    {
     if(tree[baseIndex].rightIndex == - 1)
      {
       tree[baseIndex].rightIndex = treeIndex;
       if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
        return;
       if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
        break;
       makeTreeNode(tree[treeIndex], data);
       for(
           int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x));
           _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), 0 ^ (int(2))))));
           _injected_loop_counter ++
       )
        {
         return;
        }
      }
     else
      {
       baseIndex = tree[baseIndex].rightIndex;
       continue;
      }
    }
   if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0)))))
    return;
  }
}
int search(int target)
{
 BST currentNode;
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
  {
   for(
       int _injected_loop_counter = 0;
       _GLF_WRAPPED_LOOP(_injected_loop_counter < 1);
       _injected_loop_counter ++
   )
    {
     if(_GLF_WRAPPED_IF_FALSE(false))
      {
      }
     else
      {
       return 1;
      }
    }
  }
 if(_GLF_DEAD(false))
  {
   vec4 donor_replacementGLF_dead0_GLF_color = _GLF_FUZZED(abs(vec4(- 1.1, - 953.142, 119.190, 9957.9982)));
   if(_GLF_DEAD(false))
    return 1;
   bool donor_replacementGLF_dead0c1 = _GLF_FUZZED(true);
   bool donor_replacementGLF_dead0c2 = _GLF_FUZZED(true);
   bool donor_replacementGLF_dead0c3 = _GLF_FUZZED(false);
   vec3 donor_replacementGLF_dead0col = _GLF_FUZZED(vec3(_GLF_IDENTITY(_GLF_IDENTITY(- 3286.1973, max(- 3286.1973, - 3286.1973)), min(- 3286.1973, _GLF_IDENTITY(- 3286.1973, mix(float(_GLF_FUZZED(81.51)), float(- 3286.1973), bool(true))))), 350.133, 85.09));
   vec2 donor_replacementGLF_dead0uv = _GLF_FUZZED(_GLF_IDENTITY(resolution, min(resolution, resolution)));
   if(! donor_replacementGLF_dead0c1 && _GLF_IDENTITY(! donor_replacementGLF_dead0c2, ! (! (! donor_replacementGLF_dead0c2))) && donor_replacementGLF_dead0c3)
    {
     float GLF_dead0stripe = GLF_dead0compute_stripe(_GLF_IDENTITY(cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), clamp(_GLF_IDENTITY(cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), max(cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0))), cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), _GLF_IDENTITY(cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), clamp(cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), _GLF_IDENTITY(cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), min(cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0), cos((donor_replacementGLF_dead0uv.x + donor_replacementGLF_dead0uv.y) * 20.0))))))));
     donor_replacementGLF_dead0col = mix(vec3(.7, sinh(donor_replacementGLF_dead0uv.x), donor_replacementGLF_dead0uv.x), vec3(.3, .5, donor_replacementGLF_dead0uv.x), GLF_dead0stripe);
     donor_replacementGLF_dead0_GLF_color = vec4(donor_replacementGLF_dead0col, 1.0);
     if(_GLF_DEAD(false))
      return 1;
    }
   if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
    {
     if(_GLF_DEAD(_GLF_IDENTITY(false, (false) || false)))
      return 1;
     Obj donor_replacementGLF_dead10obj;
     while(target >= 0)
      {
       donor_replacementGLF_dead10obj.even_numbers[(target) >= 0 && (target) < 10 ? target : 0] = GLF_dead7s_g;
       GLF_dead7s_g += 2.;
       if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
        discard;
       target --;
      }
    }
  }
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
  {
   switch(_GLF_SWITCH(0))
    {
     case 0:
     case 36:
     if(_GLF_DEAD(false))
      return 1;
     if(float(target) >= GLF_dead7s_g)
      {
       if(_GLF_DEAD(false))
        return 1;
       GLF_dead7h_r;
      }
     break;
     case 63:
     bitfieldInsert(ivec2(- 16757, 28163), ivec2(- 9783, 33078), target, - 66827);
     default:
     1;
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
      return 1;
    }
  }
 int index = 0;
 while(index != - 1)
  {
   switch(_GLF_SWITCH(int(_GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) * cos(vec2(0.0, 0.0))).x))))
    {
     case 0:
     currentNode = tree[index];
     if(_GLF_DEAD(false))
      continue;
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
      continue;
     if(currentNode.data == target)
      {
       if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
        continue;
       return target;
       if(_GLF_DEAD(false))
        {
         vec4 donor_replacementGLF_dead10_GLF_color = _GLF_FUZZED(uintBitsToFloat(uvec4(65241u, 183721u, 168401u, 101375u)));
         mediump vec4 donor_replacementGLF_dead10gl_FragCoord = _GLF_FUZZED(_GLF_color);
         {
          switch(_GLF_SWITCH(0))
           {
            case 46:
            int _GLF_SWITCH_2_0v;
            case 0:
            case 93:
            Obj GLF_dead10obj;
            int GLF_dead10odd_index = 0;
            float GLF_dead10odd_number = 1.0;
            while(GLF_dead10odd_index <= 9)
             {
              GLF_dead10obj.odd_numbers[(GLF_dead10odd_index) >= 0 && (GLF_dead10odd_index) < 10 ? GLF_dead10odd_index : 0] = GLF_dead10odd_number;
              GLF_dead10odd_number += 2.0;
              GLF_dead10odd_index ++;
             }
            int GLF_dead10even_index = 9;
            float GLF_dead10even_number = 0.0;
            while(GLF_dead10even_index >= 0)
             {
              GLF_dead10obj.even_numbers[(GLF_dead10even_index) >= 0 && (GLF_dead10even_index) < 10 ? GLF_dead10even_index : 0] = GLF_dead10even_number;
              GLF_dead10even_number += 2.;
              GLF_dead10even_index --;
             }
            for(
                int GLF_dead10i = 0;
                GLF_dead10i < 9;
                GLF_dead10i ++
            )
             {
              int GLF_dead10index = GLF_dead10i;
              for(
                  int GLF_dead10j = GLF_dead10i + 1;
                  GLF_dead10j < 10;
                  GLF_dead10j ++
              )
               {
                if(GLF_dead10obj.even_numbers[(GLF_dead10j) >= 0 && (GLF_dead10j) < 10 ? GLF_dead10j : 0] < GLF_dead10obj.even_numbers[(GLF_dead10index) >= 0 && (GLF_dead10index) < 10 ? GLF_dead10index : 0])
                 {
                  GLF_dead10index = GLF_dead10j;
                 }
               }
              float GLF_dead10smaller_number = GLF_dead10obj.even_numbers[(GLF_dead10index) >= 0 && (GLF_dead10index) < 10 ? GLF_dead10index : 0];
              GLF_dead10obj.even_numbers[(GLF_dead10index) >= 0 && (GLF_dead10index) < 10 ? GLF_dead10index : 0] = GLF_dead10obj.even_numbers[(GLF_dead10i) >= 0 && (GLF_dead10i) < 10 ? GLF_dead10i : 0];
              GLF_dead10obj.even_numbers[(GLF_dead10i) >= 0 && (GLF_dead10i) < 10 ? GLF_dead10i : 0] = GLF_dead10smaller_number;
              if(_GLF_DEAD(false))
               break;
             }
            vec2 GLF_dead10uv = donor_replacementGLF_dead10gl_FragCoord.xy / GLF_dead0injectionSwitch.xy;
            vec3 GLF_dead10col = tan(pow(GLF_dead10uv.xxx, GLF_dead10uv.yyy) + vec3(GLF_dead10obj.odd_numbers[(int(floor(donor_replacementGLF_dead10gl_FragCoord.x / 1000.0))) >= 0 && (int(floor(donor_replacementGLF_dead10gl_FragCoord.x / 1000.0))) < 10 ? int(floor(donor_replacementGLF_dead10gl_FragCoord.x / 1000.0)) : 0], GLF_dead10obj.even_numbers[(int(floor(donor_replacementGLF_dead10gl_FragCoord.y / 1000.0))) >= 0 && (int(floor(donor_replacementGLF_dead10gl_FragCoord.y / 1000.0))) < 10 ? int(floor(donor_replacementGLF_dead10gl_FragCoord.y / 1000.0)) : 0], sinh(GLF_dead10uv.x)));
            donor_replacementGLF_dead10_GLF_color.rgb = GLF_dead10col;
            donor_replacementGLF_dead10_GLF_color.a = 1.0;
            break;
            case 11:
            mat3x4 _GLF_SWITCH_2_1v, _GLF_SWITCH_2_2v, _GLF_SWITCH_2_3v;
            case 56:
            ;
            default:
            1;
           }
         }
        }
      }
     index = target > currentNode.data ? currentNode.rightIndex : currentNode.leftIndex;
     break;
     if(_GLF_DEAD(false))
      continue;
     if(_GLF_DEAD(false))
      break;
     case 31:
     mat2x4 _GLF_SWITCH_0_0v, _GLF_SWITCH_0_1v;
     default:
     1;
    }
   if(_GLF_DEAD(_GLF_IDENTITY(false, ! _GLF_IDENTITY((_GLF_IDENTITY(! (false), ! (! (_GLF_IDENTITY(! (false), (! (false)) && true))))), true && ((_GLF_IDENTITY(! (false), ! (! (_GLF_IDENTITY(! (false), (! (false)) && true))))))))))
    return 1;
  }
 if(_GLF_WRAPPED_IF_TRUE(true))
  {
   return - 1;
  }
 else
  {
   if(_GLF_DEAD(false))
    return 1;
  }
}
vec3 hueColor(float angle)
{
 float nodeData = float(search(15));
 return (30.0 + angle * vec3(1.0, 5.0, nodeData)) / 50.0;
 if(_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true && (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), ! (! (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))))))
  return vec3(1.0);
}
float makeFrame(float v)
{
 for(
     int _injected_loop_counter = 1;
     _GLF_WRAPPED_LOOP(_injected_loop_counter > 0);
     _injected_loop_counter --
 )
  {
   if(_GLF_DEAD(false))
    {
     int donor_replacementGLF_dead1c = _GLF_FUZZED(- 31739);
     if(_GLF_DEAD(false))
      {
       vec3 donor_replacementGLF_dead7d = _GLF_FUZZED(vec3(4362.1858, 275.150, - 5305.8433));
       if(length(donor_replacementGLF_dead7d) <= 0.0)
        {
         continue;
        }
      }
     mat2x4 donor_replacementGLF_dead1m24 = _GLF_FUZZED(mat2x4(4.9, - 7311.5473, 969.430, - 1284.0969, 76.20, _GLF_IDENTITY(- 242.209, (false ? _GLF_FUZZED(v) : _GLF_IDENTITY(- 242.209, (- 242.209) / 1.0))), - 4052.1193, - 4.6));
     if(_GLF_DEAD(false))
      continue;
     float donor_replacementGLF_dead1sums[9];
     for(
         int GLF_dead1r = 0;
         GLF_dead1r < 4;
         GLF_dead1r ++
     )
      {
       donor_replacementGLF_dead1sums[2] += donor_replacementGLF_dead1m24[(_GLF_IDENTITY(donor_replacementGLF_dead1c, (false ? _GLF_FUZZED(_injected_loop_counter) : donor_replacementGLF_dead1c))) >= 0 && (donor_replacementGLF_dead1c) < 2 ? _GLF_IDENTITY(donor_replacementGLF_dead1c, 0 | (donor_replacementGLF_dead1c)) : 0][(GLF_dead1r) >= 0 && (GLF_dead1r) < 4 ? _GLF_IDENTITY(_GLF_IDENTITY(GLF_dead1r, 0 | (GLF_dead1r)), clamp(GLF_dead1r, GLF_dead1r, GLF_dead1r)) : 0];
      }
    }
   v *= 6.5;
  }
 if(v < 1.5)
  {
   if(_GLF_DEAD(false))
    return 1.0;
   return float(search(100));
   do
    {
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
      return 1.0;
     if(_GLF_DEAD(false))
      {
       int donor_replacementGLF_dead2c = _GLF_FUZZED(- 2593);
       mat2 donor_replacementGLF_dead2m22 = _GLF_FUZZED((false ? mat2(6571.6503, - 411.847, - 0.5, - 39.70) : mat2(mat2x4(42.63, 8.1, - 5060.9475, - 24.21, - 59.01, 548.461, 7.8, 0.6))));
       mat2x3 donor_replacementGLF_dead2m23 = _GLF_FUZZED(mat2x3(mat4(- 28.35, - 7286.7824, - 2942.9815, - 3.7, 7.2, 5.2, 1.4, - 8.2, - 5.9, 1.6, 1475.1407, - 8026.1416, 2.2, 4.9, - 4145.4855, 826.238)));
       mat2x4 donor_replacementGLF_dead2m24 = _GLF_FUZZED((+ mat2x4(392.942, - 206.560, - 6101.6888, - 573.703, 5046.0573, - 1.9, - 574.948, - 1.7)));
       mat3x2 donor_replacementGLF_dead2m32 = _GLF_FUZZED((v / mat3x2(0.3, 7.1, - 5828.2068, - 6578.9317, 52.62, - 3.5)));
       if(_GLF_DEAD(false))
        discard;
       mat3 donor_replacementGLF_dead2m33 = _GLF_FUZZED(transpose(mat3(93.69, 19.97, 5.1, _GLF_IDENTITY(13.41, min(13.41, 13.41)), - 545.976, 75.32, 5.0, 809.245, - 4.8)));
       mat3x4 donor_replacementGLF_dead2m34 = _GLF_FUZZED(mat3x4(2.6, - 952.862, - 1185.9613, - 849.426, 987.000, - 1082.1758, _GLF_IDENTITY(3561.9334, max(3561.9334, 3561.9334)), 3.7, - 4042.3538, 2170.3017, - 85.28, - 86.66));
       mat4x2 donor_replacementGLF_dead2m42 = _GLF_FUZZED(mat4x2(9.5, 2186.4255, 35.04, - 15.09, - 6.9, - 2185.8211, - 0.6, - 7.1));
       if(_GLF_DEAD(false))
        {
         if(_GLF_DEAD(false))
          discard;
         BinarySearchObject donor_replacementGLF_dead6obj;
         {
          donor_replacementGLF_dead6obj.prime_numbers[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 10 ? donor_replacementGLF_dead2c : 0] = 7;
         }
        }
       mat4x3 donor_replacementGLF_dead2m43 = _GLF_FUZZED(mat4x3(_GLF_IDENTITY(- 4452.7620, max(- 4452.7620, _GLF_IDENTITY(- 4452.7620, mix(float(_GLF_FUZZED(1075.7202)), float(- 4452.7620), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))), - 5.3, - 267.290, - 331.094, 6366.2059, - 2.0, 0.4, - 17.98, - 1.8, - 96.70, 87.84, - 347.595));
       if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
        return 1.0;
       mat4 donor_replacementGLF_dead2m44 = _GLF_FUZZED(mat4(- 9.8, - 4.2, - 191.958, 885.826, 3.3, 107.900, - 65.92, 0.8, 2.4, 0.8, 2712.5364, 17.68, - 631.857, - 6.1, - 3620.0747, _GLF_IDENTITY(- 4133.0661, exp(0.0) * (_GLF_IDENTITY(- 4133.0661, max(- 4133.0661, - 4133.0661))))));
       uint donor_replacementGLF_dead2matrix_number = _GLF_FUZZED(packUnorm4x8(_GLF_color));
       float donor_replacementGLF_dead2one = _GLF_FUZZED(length((vec3(- 4.1, - 5813.4809, 75.71) * mat4x3(- 5253.1076, - 540.797, 3.4, 29.86, - 971.371, 91.80, - 4437.4592, 73.36, 5.5, 9310.3906, 256.607, 7.5))));
       int donor_replacementGLF_dead2rows = _GLF_FUZZED(40551);
       {
        for(
            int GLF_dead2r = 0;
            GLF_dead2r < donor_replacementGLF_dead2rows;
            GLF_dead2r ++
        )
         {
          do
           {
            switch(donor_replacementGLF_dead2matrix_number)
             {
              case 0u:
              donor_replacementGLF_dead2m22[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 2 ? donor_replacementGLF_dead2c : 0][(GLF_dead2r) >= 0 && (GLF_dead2r) < 2 ? GLF_dead2r : 0] = donor_replacementGLF_dead2one;
              break;
              if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
               break;
              case 1u:
              donor_replacementGLF_dead2m23[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 2 ? donor_replacementGLF_dead2c : 0][(GLF_dead2r) >= 0 && (GLF_dead2r) < 3 ? GLF_dead2r : 0] = donor_replacementGLF_dead2one;
              if(_GLF_DEAD(false))
               {
                switch(_GLF_SWITCH((0 & 56422)))
                 {
                  case 16:
                  donor_replacementGLF_dead2m32;
                  case 0:
                  {
                   continue;
                  }
                  break;
                  case 28:
                  ;
                  if(_GLF_DEAD(false))
                   discard;
                  default:
                  1;
                 }
               }
              break;
              if(_GLF_DEAD(false))
               {
                vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(min(vec4(62.89, 899.671, 8.6, 5803.0164), v));
                do
                 {
                  if(donor_replacementGLF_dead8c[(donor_replacementGLF_dead2rows) >= 0 && (donor_replacementGLF_dead2rows) < 4 ? donor_replacementGLF_dead2rows : 0] >= 1.0)
                   {
                    donor_replacementGLF_dead8c[(donor_replacementGLF_dead2rows) >= 0 && (donor_replacementGLF_dead2rows) < 4 ? donor_replacementGLF_dead2rows : 0] = donor_replacementGLF_dead8c[(donor_replacementGLF_dead2rows) >= 0 && (donor_replacementGLF_dead2rows) < 4 ? donor_replacementGLF_dead2rows : 0] * donor_replacementGLF_dead8c[(donor_replacementGLF_dead2rows) >= 0 && (donor_replacementGLF_dead2rows) < 4 ? donor_replacementGLF_dead2rows : 0];
                   }
                  donor_replacementGLF_dead2rows ++;
                 }
                while(donor_replacementGLF_dead2rows < findMSB(findLSB(donor_replacementGLF_dead2rows)));
               }
              case 2u:
              donor_replacementGLF_dead2m24[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 2 ? donor_replacementGLF_dead2c : 0][(GLF_dead2r) >= 0 && (GLF_dead2r) < 4 ? GLF_dead2r : 0] = donor_replacementGLF_dead2one;
              if(_GLF_DEAD(false))
               discard;
              break;
              case 3u:
              donor_replacementGLF_dead2m32[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 3 ? donor_replacementGLF_dead2c : 0][(GLF_dead2r) >= 0 && (GLF_dead2r) < 2 ? GLF_dead2r : 0] = donor_replacementGLF_dead2one;
              if(_GLF_DEAD(false))
               return 1.0;
              break;
              case 4u:
              donor_replacementGLF_dead2m33[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 3 ? donor_replacementGLF_dead2c : 0][(GLF_dead2r) >= 0 && (GLF_dead2r) < 3 ? GLF_dead2r : 0] = donor_replacementGLF_dead2one;
              break;
              if(_GLF_DEAD(false))
               {
                float donor_replacementGLF_dead5magnitudeX = _GLF_FUZZED(sqrt(v));
                vec4 donor_replacementGLF_dead5matrix_b = _GLF_FUZZED(_GLF_IDENTITY(acos(vec4(donor_replacementGLF_dead2one, donor_replacementGLF_dead2one, resolution)), (true ? acos(vec4(donor_replacementGLF_dead2one, donor_replacementGLF_dead2one, resolution)) : _GLF_FUZZED(vec4(2.9, - 6.6, - 9.3, - 8.5)))));
                vec4 donor_replacementGLF_dead5matrix_u = _GLF_FUZZED(dFdx(vec4(- 5914.3572, 63.73, - 2925.7106, 32.20)));
                {
                 if(_GLF_DEAD(_GLF_IDENTITY(false, (false) && true)))
                  {
                   if(_GLF_DEAD(false))
                    break;
                   vec4 donor_replacementGLF_dead11_GLF_color = _GLF_FUZZED(_GLF_color);
                   float donor_replacementGLF_dead11data[10];
                   {
                    donor_replacementGLF_dead11_GLF_color = vec4(donor_replacementGLF_dead11data[5] / 10.0, donor_replacementGLF_dead11data[9] / 10.0, donor_replacementGLF_dead11data[0] / 10.0, 1.0);
                   }
                  }
                 for(
                     int GLF_dead5x = donor_replacementGLF_dead2rows - 1;
                     GLF_dead5x >= donor_replacementGLF_dead2c;
                     GLF_dead5x --
                 )
                  {
                   donor_replacementGLF_dead5magnitudeX += pow(donor_replacementGLF_dead2m44[(GLF_dead5x) >= 0 && (GLF_dead5x) < 4 ? GLF_dead5x : 0][(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 4 ? donor_replacementGLF_dead2c : 0], 2.0);
                   donor_replacementGLF_dead5matrix_u[(GLF_dead5x) >= 0 && (GLF_dead5x) < 4 ? GLF_dead5x : 0] = donor_replacementGLF_dead2m44[(GLF_dead5x) >= 0 && (GLF_dead5x) < 4 ? GLF_dead5x : 0][(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 4 ? donor_replacementGLF_dead2c : 0];
                  }
                 donor_replacementGLF_dead5magnitudeX = sqrt(donor_replacementGLF_dead5magnitudeX);
                 donor_replacementGLF_dead5matrix_u[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 4 ? donor_replacementGLF_dead2c : 0] -= (sign(donor_replacementGLF_dead5matrix_u[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 4 ? donor_replacementGLF_dead2c : 0]) * donor_replacementGLF_dead5magnitudeX);
                 for(
                     int GLF_dead5u = donor_replacementGLF_dead2rows - 1;
                     GLF_dead5u >= donor_replacementGLF_dead2c;
                     GLF_dead5u --
                 )
                  {
                   donor_replacementGLF_dead2one += pow(donor_replacementGLF_dead5matrix_u[(GLF_dead5u) >= 0 && (GLF_dead5u) < 4 ? GLF_dead5u : 0], 2.0);
                  }
                 _GLF_IDENTITY(donor_replacementGLF_dead2one = 2.0 / donor_replacementGLF_dead2one, (donor_replacementGLF_dead2one = 2.0 / donor_replacementGLF_dead2one) * 1.0);
                 for(
                     int GLF_dead5j = donor_replacementGLF_dead2c;
                     GLF_dead5j < donor_replacementGLF_dead2rows;
                     GLF_dead5j ++
                 )
                  {
                   for(
                       int GLF_dead5a = donor_replacementGLF_dead2rows - 1;
                       GLF_dead5a >= donor_replacementGLF_dead2c;
                       GLF_dead5a --
                   )
                    {
                     v += donor_replacementGLF_dead5matrix_u[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0] * donor_replacementGLF_dead2m44[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0][(GLF_dead5j) >= 0 && _GLF_IDENTITY((GLF_dead5j), ((GLF_dead5j)) | ((GLF_dead5j))) < 4 ? GLF_dead5j : 0];
                    }
                   v = donor_replacementGLF_dead2one * v;
                   for(
                       int GLF_dead5a = donor_replacementGLF_dead2rows - 1;
                       GLF_dead5a >= donor_replacementGLF_dead2c;
                       GLF_dead5a --
                   )
                    {
                     donor_replacementGLF_dead2m44[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0][(GLF_dead5j) >= 0 && (GLF_dead5j) < 4 ? GLF_dead5j : 0] = donor_replacementGLF_dead2m44[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0][(GLF_dead5j) >= 0 && (GLF_dead5j) < 4 ? GLF_dead5j : 0] - (v * donor_replacementGLF_dead5matrix_u[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0]);
                     if(_GLF_DEAD(false))
                      break;
                    }
                   v = 0.0;
                   v = 0.0;
                  }
                 for(
                     int GLF_dead5b = donor_replacementGLF_dead2rows - 1;
                     GLF_dead5b >= donor_replacementGLF_dead2c;
                     GLF_dead5b --
                 )
                  {
                   v += donor_replacementGLF_dead5matrix_u[(GLF_dead5b) >= 0 && (GLF_dead5b) < 4 ? GLF_dead5b : 0] * donor_replacementGLF_dead5matrix_b[_GLF_IDENTITY((GLF_dead5b) >= 0 && (GLF_dead5b) < 4, ! (! ((GLF_dead5b) >= 0 && (GLF_dead5b) < 4))) ? GLF_dead5b : 0];
                  }
                 v = donor_replacementGLF_dead2one * v;
                 for(
                     int GLF_dead5b = donor_replacementGLF_dead2rows - 1;
                     GLF_dead5b >= donor_replacementGLF_dead2c;
                     GLF_dead5b --
                 )
                  {
                   donor_replacementGLF_dead5matrix_b[(GLF_dead5b) >= 0 && (GLF_dead5b) < 4 ? GLF_dead5b : 0] = donor_replacementGLF_dead5matrix_b[(GLF_dead5b) >= 0 && (GLF_dead5b) < 4 ? GLF_dead5b : 0] - (v * donor_replacementGLF_dead5matrix_u[(GLF_dead5b) >= 0 && (GLF_dead5b) < 4 ? GLF_dead5b : 0]);
                  }
                 donor_replacementGLF_dead5magnitudeX = 0.0;
                 donor_replacementGLF_dead2one = 0.0;
                 donor_replacementGLF_dead2one = 0.0;
                 v = 0.0;
                 v = 0.0;
                }
                if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
                 continue;
               }
              case 5u:
              if(_GLF_DEAD(false))
               return 1.0;
              do
               {
                if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, max(0.0, 0.0))))))
                 continue;
                if(_GLF_DEAD(false))
                 break;
                donor_replacementGLF_dead2m34[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 3 ? donor_replacementGLF_dead2c : 0][(GLF_dead2r) >= 0 && (GLF_dead2r) < 4 ? GLF_dead2r : 0] = donor_replacementGLF_dead2one;
               }
              while(_GLF_WRAPPED_LOOP(false));
              break;
              case 6u:
              donor_replacementGLF_dead2m42[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 4 ? donor_replacementGLF_dead2c : 0][(GLF_dead2r) >= 0 && (GLF_dead2r) < 2 ? GLF_dead2r : 0] = donor_replacementGLF_dead2one;
              if(_GLF_DEAD(false))
               break;
              break;
              case 7u:
              if(_GLF_WRAPPED_IF_TRUE(true))
               {
                switch(_GLF_SWITCH(int(_GLF_ZERO(0.0, injectionSwitch.x))))
                 {
                  case 63:
                  if(_GLF_DEAD(false))
                   discard;
                  mat4 _GLF_SWITCH_1_0v;
                  case 0:
                  donor_replacementGLF_dead2m43[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 4 ? donor_replacementGLF_dead2c : 0][(GLF_dead2r) >= 0 && (GLF_dead2r) < 3 ? GLF_dead2r : 0] = donor_replacementGLF_dead2one;
                  break;
                  case 57:
                  ((donor_replacementGLF_dead2matrix_number ++) & 68475u);
                  default:
                  1;
                 }
               }
              else
               {
               }
              break;
              case 8u:
              donor_replacementGLF_dead2m44[(donor_replacementGLF_dead2c) >= 0 && (donor_replacementGLF_dead2c) < 4 ? donor_replacementGLF_dead2c : 0][(GLF_dead2r) >= 0 && (GLF_dead2r) < 4 ? GLF_dead2r : 0] = donor_replacementGLF_dead2one;
              break;
             }
           }
          while(_GLF_WRAPPED_LOOP(false));
         }
       }
      }
    }
   while(_GLF_WRAPPED_LOOP(false));
  }
 if(v < 4.0)
  {
   return injectionSwitch.x;
   if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)), determinant(mat2(1.0, 0.0, 0.0, 1.0)), 1.0)), _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(- 110.690)), float(1.0), bool(true))), 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)), determinant(mat2(1.0, 0.0, 0.0, 1.0)), 1.0)), mix(float(_GLF_FUZZED(64.54)), float(dot(vec3(0.0, 0.0, 0.0), vec3(_GLF_IDENTITY(determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)), (false ? _GLF_FUZZED(GLF_dead7h_r) : determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)))), determinant(mat2(1.0, 0.0, 0.0, 1.0)), 1.0))), bool(_GLF_IDENTITY(true, true && (true))))))))))
    return 1.0;
  }
 if(v < float(search(6)))
  {
   if(_GLF_DEAD(_GLF_FALSE(_GLF_IDENTITY(false, false || (false)), (gl_FragCoord.x < abs(0.0)))))
    {
     if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
      {
       int donor_replacementGLF_dead6a = _GLF_FUZZED(98974);
       int donor_replacementGLF_dead6b = _GLF_FUZZED(bitfieldReverse(- 53625));
       if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
        {
         Obj donor_replacementGLF_dead10obj;
         {
          donor_replacementGLF_dead10obj.even_numbers[(donor_replacementGLF_dead6a) >= 0 && (donor_replacementGLF_dead6a) < 10 ? donor_replacementGLF_dead6a : 0] = GLF_dead7b_b;
          GLF_dead7b_b += 2.;
          donor_replacementGLF_dead6a --;
         }
        }
       int donor_replacementGLF_dead6c = _GLF_FUZZED((- 32465 | 12509));
       vec2 donor_replacementGLF_dead6uv = _GLF_FUZZED(round(uintBitsToFloat(uvec2(156694u, 114365u))));
       do
        {
         donor_replacementGLF_dead6uv.y -= step(GLF_dead0injectionSwitch.y, donor_replacementGLF_dead6uv.x) + float(donor_replacementGLF_dead6a) + float(donor_replacementGLF_dead6b);
         if(_GLF_DEAD(false))
          break;
         donor_replacementGLF_dead6uv.x += ldexp(GLF_dead0injectionSwitch.y, isinf(donor_replacementGLF_dead6uv.y + donor_replacementGLF_dead6uv.x) ? findMSB(donor_replacementGLF_dead6b) : findMSB(donor_replacementGLF_dead6a));
         donor_replacementGLF_dead6c --;
        }
       while(donor_replacementGLF_dead6c > int(GLF_dead0injectionSwitch.x));
      }
     return 1.0;
    }
   return 1.0;
  }
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
  return _GLF_IDENTITY(1.0, (1.0) / 1.0);
 return 10.0 + float(_GLF_IDENTITY(search(_GLF_IDENTITY(30, clamp(30, _GLF_IDENTITY(30, ~ (~ (_GLF_IDENTITY(30, 0 ^ (30))))), _GLF_IDENTITY(30, 0 + (30))))), 0 | (search(30))));
}
void main()
{
 int treeIndex = int(injectionSwitch.x);
 makeTreeNode(tree[int(injectionSwitch.x)], 9);
 do
  {
   treeIndex ++;
  }
 while(_GLF_WRAPPED_LOOP(false));
 if(_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) || false)))
  {
   if(_GLF_WRAPPED_IF_FALSE(false))
    {
     if(_GLF_DEAD(false))
      return;
    }
   else
    {
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 0.0, 0.0, sin(0.0)))))))
      return;
     if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
      {
       if(_GLF_DEAD(false))
        return;
       if(_GLF_DEAD(false))
        return;
       int donor_replacementGLF_dead3i = _GLF_FUZZED(80009);
       float donor_replacementGLF_dead3limit = _GLF_FUZZED((min(_GLF_IDENTITY(89.53, max(_GLF_IDENTITY(89.53, max(89.53, 89.53)), 89.53)), - 4809.9316) - 51.69));
       float donor_replacementGLF_dead3s = _GLF_FUZZED(dot(_GLF_color, mod(_GLF_color, _GLF_color)));
       if(float(donor_replacementGLF_dead3i) >= donor_replacementGLF_dead3limit)
        {
         donor_replacementGLF_dead3s;
        }
      }
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
      return;
    }
  }
 else
  {
   for(
       int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), (int(1)) + 0)));
       _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, 0 | (_injected_loop_counter)) > 0);
       _injected_loop_counter --
   )
    {
     if(_GLF_DEAD(false))
      {
       float donor_replacementGLF_dead4A[50];
       {
        donor_replacementGLF_dead4A[(treeIndex / 4) >= 0 && (treeIndex / 4) < 50 ? treeIndex / 4 : 0] = float(treeIndex);
       }
      }
     insert(treeIndex, 5);
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
      {
       vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(tan(max(vec4(- 967.966, 712.174, - 68.20, 141.225), _GLF_color)));
       int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(treeIndex);
       if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
        break;
       do
        {
         if(donor_replacementGLF_dead8c[(treeIndex) >= 0 && (treeIndex) < 4 ? treeIndex : 0] >= 1.0)
          {
           donor_replacementGLF_dead8c[(treeIndex) >= 0 && (treeIndex) < 4 ? treeIndex : 0] = donor_replacementGLF_dead8c[(treeIndex) >= 0 && (treeIndex) < 4 ? treeIndex : 0] * donor_replacementGLF_dead8c[(treeIndex) >= 0 && (treeIndex) < 4 ? treeIndex : 0];
          }
         treeIndex ++;
        }
       while(treeIndex < findMSB(findLSB(donor_replacementGLF_dead8msb8)));
      }
    }
   if(_GLF_DEAD(false))
    {
     int donor_replacementGLF_dead6i = _GLF_FUZZED(treeIndex);
     BinarySearchObject donor_replacementGLF_dead6obj;
     {
      donor_replacementGLF_dead6obj.prime_numbers[(donor_replacementGLF_dead6i) >= 0 && (donor_replacementGLF_dead6i) < 10 ? donor_replacementGLF_dead6i : 0] = 2;
     }
    }
  }
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
  {
   if(_GLF_DEAD(false))
    return;
   float donor_replacementGLF_dead4A[50];
   vec4 donor_replacementGLF_dead4_GLF_color = _GLF_FUZZED(_GLF_color);
   mediump vec4 donor_replacementGLF_dead4gl_FragCoord = _GLF_FUZZED(_GLF_color);
   if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 100)
    {
     donor_replacementGLF_dead4_GLF_color = vec4(donor_replacementGLF_dead4A[20] / resolution.x, donor_replacementGLF_dead4A[24] / resolution.y, 1.0, 1.0);
    }
   else
    if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 120)
     {
      donor_replacementGLF_dead4_GLF_color = vec4(donor_replacementGLF_dead4A[25] / resolution.x, donor_replacementGLF_dead4A[29] / resolution.y, 1.0, 1.0);
     }
    else
     {
      if(_GLF_DEAD(false))
       return;
      if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 140)
       {
        donor_replacementGLF_dead4_GLF_color = vec4(_GLF_IDENTITY(donor_replacementGLF_dead4A[30] / resolution.x, clamp(donor_replacementGLF_dead4A[30] / resolution.x, donor_replacementGLF_dead4A[30] / resolution.x, donor_replacementGLF_dead4A[30] / resolution.x)), donor_replacementGLF_dead4A[34] / resolution.y, 1.0, 1.0);
       }
      else
       if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 160)
        {
         if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
          return;
         donor_replacementGLF_dead4_GLF_color = vec4(donor_replacementGLF_dead4A[35] / resolution.x, donor_replacementGLF_dead4A[39] / resolution.y, 1.0, 1.0);
        }
       else
        if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 180)
         {
          donor_replacementGLF_dead4_GLF_color = vec4(donor_replacementGLF_dead4A[40] / resolution.x, donor_replacementGLF_dead4A[44] / resolution.y, 1.0, 1.0);
         }
        else
         if(int(donor_replacementGLF_dead4gl_FragCoord.x) < 180)
          {
           donor_replacementGLF_dead4_GLF_color = vec4(donor_replacementGLF_dead4A[45] / resolution.x, donor_replacementGLF_dead4A[49] / resolution.y, 1.0, 1.0);
          }
         else
          {
           discard;
          }
     }
   if(_GLF_DEAD(false))
    return;
  }
 treeIndex ++;
 insert(treeIndex, 12);
 if(_GLF_DEAD(false))
  {
   if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
    {
     {
      GLF_dead7b_b;
     }
     if(_GLF_DEAD(false))
      return;
    }
   if(_GLF_DEAD(false))
    return;
   return;
  }
 do
  {
   treeIndex ++;
  }
 while(_GLF_WRAPPED_LOOP(false));
 insert(treeIndex, 15);
 treeIndex ++;
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0)))))
  return;
 insert(treeIndex, 7);
 treeIndex ++;
 if(_GLF_DEAD(false))
  return;
 for(
     int _injected_loop_counter = (0 | 0);
     _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y)));
     _injected_loop_counter ++
 )
  {
   insert(treeIndex, 8);
  }
 if(_GLF_WRAPPED_IF_FALSE(false))
  {
  }
 else
  {
   for(
       int _injected_loop_counter = (1 | _GLF_IDENTITY(1, max(1, 1)));
       _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x)));
       _injected_loop_counter --
   )
    {
     if(_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))
      continue;
     treeIndex ++;
    }
  }
 do
  {
   if(_GLF_DEAD(false))
    return;
   switch(_GLF_SWITCH(0))
    {
     case 70:
     mat4x3(2336.6309, 90.78, 4.0, - 430.696, - 27.03, 63.25, - 5.4, 86.90, 3411.4871, 10.10, - 89.55, 55.17);
     case 0:
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
      continue;
     if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0)))))
      {
       insert(treeIndex, 2);
      }
     else
      {
      }
     break;
     default:
     1;
    }
  }
 while(_GLF_WRAPPED_LOOP(false));
 treeIndex ++;
 if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
  return;
 insert(treeIndex, 6);
 treeIndex ++;
 insert(treeIndex, 17);
 treeIndex ++;
 if(_GLF_DEAD(false))
  {
   for(
       int _injected_loop_counter = (0 | 1);
       _GLF_WRAPPED_LOOP(_injected_loop_counter > 0);
       _injected_loop_counter --
   )
    {
     return;
     if(_GLF_DEAD(false))
      continue;
    }
  }
 if(_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
  {
  }
 else
  {
   insert(treeIndex, 13);
  }
 vec2 z = (gl_FragCoord.yx / resolution);
 float x = makeFrame(z.x);
 float y = makeFrame(_GLF_IDENTITY(z.y, max(_GLF_IDENTITY(z.y, (true ? z.y : _GLF_FUZZED(5.1))), z.y)));
 if(_GLF_DEAD(false))
  {
   {
    x = clamp(0.0, 1.0, x * 3.0);
   }
  }
 int sum = - 100;
 if(_GLF_DEAD(false))
  {
   {
    discard;
   }
  }
 if(_GLF_DEAD(_GLF_IDENTITY(false, (false) || false)))
  {
   if(_GLF_DEAD(false))
    {
     float donor_replacementGLF_dead5magnitudeX = _GLF_FUZZED(x);
     mat4 donor_replacementGLF_dead5matrix_a = _GLF_FUZZED(mat4(486.433, - 8.1, 77.14, 88.79, - 47.61, 4594.0222, 7.8, 43.95, - 5.4, - 546.549, 27.85, - 597.514, 6.1, 46.59, - 602.482, - 1080.7203));
     vec4 donor_replacementGLF_dead5matrix_u = _GLF_FUZZED(clamp(_GLF_color, y, x));
     {
      if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
       {
        if(_GLF_DEAD(false))
         return;
        float donor_replacementGLF_dead8limit = _GLF_FUZZED(- 9040.4863);
        float donor_replacementGLF_dead8ref = _GLF_FUZZED(float(77519));
        {
         if(mod(float(treeIndex), donor_replacementGLF_dead8ref) <= 0.01)
          {
           GLF_dead7h_r += 0.2;
          }
         if(_GLF_DEAD(false))
          return;
         if(float(treeIndex) >= donor_replacementGLF_dead8limit)
          {
           GLF_dead7h_r;
          }
         treeIndex ++;
         if(_GLF_DEAD(false))
          return;
        }
       }
      donor_replacementGLF_dead5magnitudeX += pow(donor_replacementGLF_dead5matrix_a[(sum) >= 0 && (sum) < 4 ? sum : 0][_GLF_IDENTITY((treeIndex) >= 0, true && ((treeIndex) >= 0)) && (treeIndex) < 4 ? treeIndex : 0], 2.0);
      donor_replacementGLF_dead5matrix_u[(sum) >= 0 && (sum) < 4 ? sum : 0] = donor_replacementGLF_dead5matrix_a[(sum) >= 0 && (sum) < 4 ? sum : 0][(treeIndex) >= 0 && (treeIndex) < 4 ? treeIndex : 0];
     }
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
      {
       Obj donor_replacementGLF_dead10obj;
       int donor_replacementGLF_dead10odd_index = _GLF_FUZZED(56936);
       if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
        return;
       while(donor_replacementGLF_dead10odd_index <= 9)
        {
         donor_replacementGLF_dead10obj.odd_numbers[(donor_replacementGLF_dead10odd_index) >= 0 && (donor_replacementGLF_dead10odd_index) < 10 ? donor_replacementGLF_dead10odd_index : 0] = donor_replacementGLF_dead5magnitudeX;
         donor_replacementGLF_dead5magnitudeX += 2.0;
         donor_replacementGLF_dead10odd_index ++;
        }
      }
    }
   float donor_replacementGLF_dead3s = _GLF_FUZZED(cosh(_GLF_IDENTITY(- 9.2, clamp(- 9.2, _GLF_IDENTITY(- 9.2, min(- 9.2, - 9.2)), - 9.2))));
   {
    donor_replacementGLF_dead3s += 0.2;
   }
  }
 for(
     int target = 0;
     _GLF_IDENTITY(target < 20, ! (! (target < 20)));
     target ++
 )
  {
   if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(_GLF_IDENTITY(sin(0.0), max(sin(0.0), sin(0.0))))))))
    {
     int donor_replacementGLF_dead5b = _GLF_FUZZED(max(((_GLF_IDENTITY(~ sum, (false ? _GLF_FUZZED(bitfieldExtract(target, 45896, target)) : ~ sum))) >> target), target));
     vec4 donor_replacementGLF_dead5matrix_b = _GLF_FUZZED(vec4(_GLF_IDENTITY(3470.3814, min(3470.3814, 3470.3814)), 8158.5321, 9.2, 492.504));
     vec4 donor_replacementGLF_dead5matrix_u = _GLF_FUZZED(vec4(x, vec3(- 84.11, - 900.772, 52.87)));
     {
      switch(_GLF_SWITCH((0 >> _GLF_IDENTITY(int(7), int(7)))))
       {
        case 53:
        ivec3(- 40205, 45392, - 4168);
        case 2:
        resolution;
        case 0:
        donor_replacementGLF_dead5matrix_b[(donor_replacementGLF_dead5b) >= 0 && (donor_replacementGLF_dead5b) < 4 ? donor_replacementGLF_dead5b : 0] = donor_replacementGLF_dead5matrix_b[(donor_replacementGLF_dead5b) >= 0 && (donor_replacementGLF_dead5b) < 4 ? donor_replacementGLF_dead5b : 0] - (x * donor_replacementGLF_dead5matrix_u[(donor_replacementGLF_dead5b) >= 0 && (donor_replacementGLF_dead5b) < 4 ? donor_replacementGLF_dead5b : 0]);
        case 59:
        if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
         {
          Obj donor_replacementGLF_dead10obj;
          for(
              int GLF_dead10i = 0;
              GLF_dead10i < 9;
              GLF_dead10i ++
          )
           {
            if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
             continue;
            int GLF_dead10index = GLF_dead10i;
            for(
                int GLF_dead10j = GLF_dead10i + 1;
                GLF_dead10j < 10;
                GLF_dead10j ++
            )
             {
              if(donor_replacementGLF_dead10obj.even_numbers[(GLF_dead10j) >= 0 && (GLF_dead10j) < 10 ? GLF_dead10j : 0] < donor_replacementGLF_dead10obj.even_numbers[(GLF_dead10index) >= 0 && (GLF_dead10index) < 10 ? GLF_dead10index : 0])
               {
                GLF_dead10index = GLF_dead10j;
               }
             }
            float GLF_dead10smaller_number = donor_replacementGLF_dead10obj.even_numbers[(GLF_dead10index) >= 0 && (GLF_dead10index) < 10 ? GLF_dead10index : 0];
            donor_replacementGLF_dead10obj.even_numbers[(GLF_dead10index) >= 0 && (GLF_dead10index) < 10 ? GLF_dead10index : 0] = donor_replacementGLF_dead10obj.even_numbers[(GLF_dead10i) >= 0 && (GLF_dead10i) < 10 ? GLF_dead10i : 0];
            donor_replacementGLF_dead10obj.even_numbers[(GLF_dead10i) >= 0 && (GLF_dead10i) < 10 ? GLF_dead10i : 0] = GLF_dead10smaller_number;
           }
         }
        break;
        case 37:
        mat3x4 _GLF_SWITCH_2_0v[15];
        case 92:
        if((bvec4(true, true, false, false) == bvec4(false, bvec2(true, false), true)))
         {
          if(false)
           {
            discard;
           }
          else
           {
            if(_GLF_DEAD(false))
             break;
            mat2x4(GLF_dead7s_g);
            ;
            sum;
            bvec3(false, false, true);
            ;
            ivec3 _GLF_SWITCH_2_1v;
           }
          if(_GLF_DEAD(_GLF_IDENTITY(false, false || (false))))
           return;
          bvec3 _GLF_SWITCH_2_2v[80], _GLF_SWITCH_2_3v;
          vec3 _GLF_SWITCH_2_4v;
          if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
           break;
         }
        default:
        1;
       }
     }
    }
   if(_GLF_DEAD(false))
    return;
   int result = search(target);
   if(result > 0)
    {
     sum += result;
    }
   else
    {
     switch(result)
      {
       case - 1:
       do
        {
         sum += int(injectionSwitch.y);
        }
       while(_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
       if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
        discard;
       if(_GLF_DEAD(false))
        continue;
       break;
       if(_GLF_DEAD(false))
        break;
       if(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, clamp(injectionSwitch.x, injectionSwitch.x, injectionSwitch.x)) > _GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(- 99.98), _GLF_FUZZED(- 4770.2204)), vec2((injectionSwitch)[0], _GLF_IDENTITY((injectionSwitch)[1], (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(GLF_dead7time) : (injectionSwitch)[1]))), bvec2(true, true))).y))))
        {
         if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 0.0))))))
          continue;
         mat2 donor_replacementGLF_dead1m22 = _GLF_FUZZED(mat2(mat4x2(80.42, 56.14, 90.08, 5.3, - 68.95, 9.5, 1.7, - 1.8)));
         if(_GLF_DEAD(false))
          continue;
         float donor_replacementGLF_dead1sums[9];
         for(
             int GLF_dead1c = 0;
             GLF_dead1c < 2;
             GLF_dead1c ++
         )
          {
           for(
               int GLF_dead1r = 0;
               GLF_dead1r < 2;
               GLF_dead1r ++
           )
            {
             if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
              {
               if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
                continue;
               float donor_replacementGLF_dead11data[10];
               {
                donor_replacementGLF_dead11data[(sum) >= 0 && (sum) < 10 ? sum : 0] = float(10 - sum) * injectionSwitch.y;
               }
              }
             donor_replacementGLF_dead1sums[0] += donor_replacementGLF_dead1m22[(GLF_dead1c) >= 0 && (GLF_dead1c) < 2 ? GLF_dead1c : 0][(GLF_dead1r) >= 0 && (GLF_dead1r) < 2 ? GLF_dead1r : 0];
            }
          }
        }
       if(_GLF_DEAD(false))
        {
         float donor_replacementGLF_dead5beta = _GLF_FUZZED(x);
         mat4 donor_replacementGLF_dead5matrix_a = _GLF_FUZZED(mat4(- 5505.1962, - 238.521, - 855.502, 753.785, _GLF_IDENTITY(4690.1263, (false ? _GLF_FUZZED(normalize(GLF_dead7time)) : 4690.1263)), 42.65, 8.6, - 2.8, - 270.455, 8.5, - 73.69, 117.169, - 5057.0073, 74.48, - 9075.5829, - 3.0));
         vec4 donor_replacementGLF_dead5matrix_u = _GLF_FUZZED((x + vec4(- 167.200, - 7.1, - 1285.0846, - 828.953)));
         for(
             int GLF_dead5j = treeIndex;
             GLF_dead5j < treeIndex;
             GLF_dead5j ++
         )
          {
           for(
               int GLF_dead5a = treeIndex - 1;
               GLF_dead5a >= treeIndex;
               GLF_dead5a --
           )
            {
             y += donor_replacementGLF_dead5matrix_u[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0] * donor_replacementGLF_dead5matrix_a[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0][(GLF_dead5j) >= 0 && (GLF_dead5j) < 4 ? GLF_dead5j : 0];
             if(_GLF_DEAD(false))
              break;
            }
           donor_replacementGLF_dead5beta = x * y;
           for(
               int GLF_dead5a = treeIndex - 1;
               GLF_dead5a >= treeIndex;
               GLF_dead5a --
           )
            {
             donor_replacementGLF_dead5matrix_a[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0][(GLF_dead5j) >= 0 && (GLF_dead5j) < 4 ? GLF_dead5j : 0] = donor_replacementGLF_dead5matrix_a[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0][(GLF_dead5j) >= 0 && (GLF_dead5j) < 4 ? GLF_dead5j : 0] - (donor_replacementGLF_dead5beta * donor_replacementGLF_dead5matrix_u[(GLF_dead5a) >= 0 && (GLF_dead5a) < 4 ? GLF_dead5a : 0]);
            }
           y = 0.0;
           donor_replacementGLF_dead5beta = 0.0;
          }
        }
       if(_GLF_DEAD(false))
        return;
       case 0:
       return;
       if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
        discard;
      }
     if(_GLF_DEAD(false))
      break;
     if(_GLF_DEAD(false))
      break;
    }
   if(_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, (_GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch))) + sqrt(vec2(0.0, 0.0))).x > injectionSwitch.y))))
    {
    }
   else
    {
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
      {
       if(_GLF_DEAD(false))
        break;
       vec4 donor_replacementGLF_dead0_GLF_color = _GLF_FUZZED(_GLF_color);
       vec3 donor_replacementGLF_dead0col = _GLF_FUZZED(smoothstep(vec3(- 562.911, - 2388.8331, 6.7), vec3(- 2912.6554, 6.8, 227.558), vec3(3.5, 3.2, - 8760.9793)));
       {
        float GLF_dead0stripe = GLF_dead0compute_stripe(cos((z.x + z.y) * 20.0));
        donor_replacementGLF_dead0col = mix(vec3(z.x, 0, 0.75), vec3(.8, .7, z.x), GLF_dead0stripe);
        donor_replacementGLF_dead0_GLF_color = vec4(_GLF_IDENTITY(donor_replacementGLF_dead0col, mat3(_GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(4588.1728)), float(1.0), bool(true)))) * (donor_replacementGLF_dead0col)), 1.0);
        if(_GLF_DEAD(false))
         continue;
        for(
            int _injected_loop_counter = 0;
            _GLF_WRAPPED_LOOP(_injected_loop_counter < 1);
            _injected_loop_counter ++
        )
         {
          switch(_GLF_SWITCH(((- 31340 * - 24014) & 0)))
           {
            case 0:
            if(_GLF_DEAD(false))
             {
              {
               int GLF_dead8msb8 = 256;
               float GLF_dead8s = float(bitfieldExtract(int(GLF_dead0injectionSwitch.x), 0, 0));
               int GLF_dead8i = bitCount(GLF_dead8msb8);
               while(GLF_dead8i < bitfieldInsert(800, GLF_dead8i, 0, 0))
                {
                 if(mod(float(GLF_dead8i), y) <= 0.01)
                  {
                   GLF_dead8s += 0.2;
                  }
                 if(float(GLF_dead8i) >= GLF_dead7s_g)
                  {
                   switch(_GLF_SWITCH((0 | 0)))
                    {
                     case 89:
                     discard;
                     case 0:
                     case 80:
                     case 60:
                     GLF_dead8s;
                     break;
                     case 65:
                     transpose(mat4x3(- 7.5, - 584.113, - 1.6, 6146.0774, 42.70, - 793.804, 7664.2668, 6.7, - 7.8, - 7721.6428, 3.6, 328.528));
                     case 27:
                     mat4(89.35, - 90.45, - 9.5, - 9759.5890, - 3.0, - 9.5, 0.7, 5.2, - 0.1, - 5.1, - 0.6, - 2.5, - 589.722, 20.42, 0.6, 83.99);
                     default:
                     1;
                    }
                  }
                 GLF_dead8i ++;
                }
               GLF_dead8s;
              }
             }
            case 39:
            return;
            break;
            case 92:
            discard;
            if(_GLF_DEAD(false))
             continue;
            if(_GLF_DEAD(false))
             {
              vec2 donor_replacementGLF_dead7position = _GLF_FUZZED((GLF_dead0injectionSwitch / log2(GLF_dead0stripe)));
              float donor_replacementGLF_dead7time = _GLF_FUZZED(GLF_dead0stripe);
              {
               y = fract(y);
               GLF_dead0stripe = 1.0;
               GLF_dead0stripe = (0.5 + (sin(donor_replacementGLF_dead7time) * 0.5 + 0.5));
               GLF_dead7doConvert();
               GLF_dead0stripe *= 1.0 / donor_replacementGLF_dead7position.y;
               y *= 1.0 / donor_replacementGLF_dead7position.x;
               if(abs(donor_replacementGLF_dead7position.y - _GLF_IDENTITY(donor_replacementGLF_dead7position, clamp(donor_replacementGLF_dead7position, donor_replacementGLF_dead7position, donor_replacementGLF_dead7position)).x) < 0.5)
                {
                 GLF_dead0stripe = clamp(0.0, 1.0, GLF_dead0stripe * 3.0);
                }
               vec3(y, _GLF_IDENTITY(GLF_dead0stripe, (GLF_dead0stripe) / exp(0.0)), GLF_dead0stripe);
              }
             }
            default:
            1;
           }
         }
       }
      }
    }
  }
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x)))))
  return;
 float a = x + y * float(sum);
 _GLF_color = vec4(hueColor(a), 1.);
}
