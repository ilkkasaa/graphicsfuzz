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
mediump vec4 GLF_dead4gl_FragCoord;

layout(set = 0, binding = 2) uniform buf2 {
 vec2 GLF_dead4resolution;
};
layout(set = 0, binding = 3) uniform buf3 {
 vec2 GLF_dead2resolution;
};
layout(set = 0, binding = 4) uniform buf4 {
 float GLF_dead3time;
};
float GLF_dead3h_r;

float GLF_dead3s_g;

float GLF_dead3b_b;

layout(set = 0, binding = 5) uniform buf5 {
 vec2 GLF_dead5resolution;
};
vec3 GLF_dead5pickColor(int GLF_dead5i)
{
 return vec3(float(GLF_dead5i) / 50.0, float(GLF_dead5i) / 120.0, float(GLF_dead5i) / 140.0);
}
vec3 GLF_dead5mand(float GLF_dead5xCoord, float GLF_dead5yCoord)
{
 float GLF_dead5height = GLF_dead5resolution.y;
 float GLF_dead5width = GLF_dead5resolution.x;
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
  {
   _GLF_color = uintBitsToFloat(uvec4(33196u, 59995u, 110347u, 159682u));
  }
 float GLF_dead5c_re = 0.8 * (GLF_dead5xCoord - GLF_dead5width / 2.0) * 4.0 / GLF_dead5width - 0.4;
 float GLF_dead5c_im = 0.8 * _GLF_IDENTITY((GLF_dead5yCoord - GLF_dead5height / 2.0), (false ? _GLF_FUZZED(GLF_dead5width) : _GLF_IDENTITY((GLF_dead5yCoord - GLF_dead5height / 2.0), max((GLF_dead5yCoord - GLF_dead5height / 2.0), _GLF_IDENTITY((GLF_dead5yCoord - GLF_dead5height / 2.0), min((GLF_dead5yCoord - GLF_dead5height / 2.0), (GLF_dead5yCoord - GLF_dead5height / 2.0))))))) * 4.0 / GLF_dead5width;
 if(_GLF_DEAD(false))
  {
   _GLF_color = vec4(-35.83, 4940.6280, -90.20, -9268.6297);
  }
 float GLF_dead5x = 0.0, GLF_dead5y = 0.0;
 int GLF_dead5iteration = 0;
 for(
     int GLF_dead5k = 0;
     GLF_dead5k < _GLF_IDENTITY(1000, (true ? 1000 : _GLF_FUZZED(GLF_dead5k)));
     GLF_dead5k ++
 )
  {
   if(GLF_dead5x * GLF_dead5x + GLF_dead5y * GLF_dead5y > 4.0)
    {
     break;
     {
      vec4 _GLF_outVarBackup_GLF_color;
      _GLF_outVarBackup_GLF_color = _GLF_color;
      _GLF_color = vec4(0.5, -0.0, -887.646, 760.030);
      if(_GLF_WRAPPED_IF_TRUE(true))
       {
        _GLF_color = _GLF_outVarBackup_GLF_color;
       }
     }
     if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
      {
       _GLF_color = mat4(111.965, 518.830, -3.1, 18.65, 5179.8326, 3.5, -9.1, -5.0, -65.03, 7.4, -82.92, -90.82, -3.4, -753.049, -4.5, 8.6)[1];
      }
    }
   {
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_outVarBackup_GLF_color = _GLF_color;
    _GLF_color = clamp(vec4(-6.6, -3.7, 0.6, 3.7), vec4(-71.79, 4.8, 649.522, 5700.4735), vec4(-21.14, -866.518, 14.43, 152.555));
    if(_GLF_WRAPPED_IF_TRUE(true))
     {
      _GLF_color = _GLF_outVarBackup_GLF_color;
     }
   }
   float GLF_dead5x_new = GLF_dead5x * GLF_dead5x - GLF_dead5y * GLF_dead5y + GLF_dead5c_re;
   GLF_dead5y = 2.0 * GLF_dead5x * GLF_dead5y + GLF_dead5c_im;
   GLF_dead5x = GLF_dead5x_new;
   GLF_dead5iteration ++;
  }
 if(GLF_dead5iteration < 1000)
  {
   return GLF_dead5pickColor(GLF_dead5iteration);
  }
 else
  {
   return vec3(0.0);
  }
}
mediump vec4 GLF_dead7gl_FragCoord;

layout(set = 0, binding = 6) uniform buf6 {
 vec2 GLF_dead7resolution;
};
bool GLF_dead7checkSwap(float GLF_dead7a, float GLF_dead7b)
{
 return GLF_dead7gl_FragCoord.y < GLF_dead7resolution.y / 2.0 ? GLF_dead7a > GLF_dead7b : GLF_dead7a < GLF_dead7b;
}
layout(set = 0, binding = 7) uniform buf7 {
 float GLF_dead8time;
};
float GLF_dead8h_r;

float GLF_dead8s_g;

float GLF_dead8b_b;

void GLF_dead8doConvert()
{
 vec3 GLF_dead8temp;
 GLF_dead8temp = GLF_dead8b_b * (1.0 - GLF_dead8s_g) + (GLF_dead8b_b - GLF_dead8b_b * (1.0 - GLF_dead8s_g)) * clamp(abs(abs(6.0 * (GLF_dead8h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
 GLF_dead8h_r = GLF_dead8temp.x;
 GLF_dead8s_g = GLF_dead8temp.y;
 GLF_dead8b_b = GLF_dead8temp.z;
}
vec3 GLF_dead8computeColor(float GLF_dead8c, vec2 GLF_dead8position)
{
 GLF_dead8h_r = fract(GLF_dead8c);
 GLF_dead8s_g = 1.0;
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(-539.638, 2288.6362, -92.17, 1.8);
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 GLF_dead8b_b = (0.5 + _GLF_IDENTITY((sin(GLF_dead8time) * 0.5 + 0.5), ((sin(GLF_dead8time) * 0.5 + 0.5)) - 0.0));
 GLF_dead8doConvert();
 GLF_dead8s_g *= 1.0 / GLF_dead8position.y;
 GLF_dead8h_r *= 1.0 / GLF_dead8position.x;
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(9.6, -7.2, -7.3, 34.26);
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 if(abs(GLF_dead8position.y - GLF_dead8position.x) < 0.5)
  {
   GLF_dead8b_b = clamp(0.0, 1.0, GLF_dead8b_b * 3.0);
  }
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(-3.0, 3362.7481, 689.487, 4.2);
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 return vec3(GLF_dead8h_r, GLF_dead8s_g, GLF_dead8b_b);
}
vec3 GLF_dead8defaultColor()
{
 return vec3(0.0);
}
bool GLF_dead4checkSwap(float GLF_dead4a, float GLF_dead4b)
{
 return GLF_dead4gl_FragCoord.y < GLF_dead4resolution.y / 2.0 ? GLF_dead4a > GLF_dead4b : GLF_dead4a < GLF_dead4b;
}
vec3 GLF_dead2pickColor(int GLF_dead2i)
{
 return vec3(float(GLF_dead2i) / 50.0, float(GLF_dead2i) / 120.0, float(GLF_dead2i) / 140.0);
}
vec3 GLF_dead2mand(float GLF_dead2xCoord, float GLF_dead2yCoord)
{
 float GLF_dead2height = GLF_dead2resolution.y;
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = mix(vec4(5.7, 131.215, 771.401, 493.980), normalize(vec4(-3.7, -593.907, -5588.0988, -5.4)), vec4(560.578, 3.0, -224.270, 2251.0057));
  if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 float GLF_dead2width = GLF_dead2resolution.x;
 float GLF_dead2c_re = 0.8 * (GLF_dead2xCoord - GLF_dead2width / 2.0) * 4.0 / GLF_dead2width - 0.4;
 float GLF_dead2c_im = 0.8 * (GLF_dead2yCoord - GLF_dead2height / 2.0) * 4.0 / GLF_dead2width;
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(-14.18, -158.343, 6.6, -328.373);
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 float GLF_dead2x = 0.0, GLF_dead2y = 0.0;
 if(_GLF_DEAD(false))
  return vec3(1.0);
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(-72.68, 680.590, -1711.7248, 2.2);
  if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 int GLF_dead2iteration = 0;
 for(
     int GLF_dead2k = 0;
     GLF_dead2k < 1000;
     GLF_dead2k ++
 )
  {
   if(GLF_dead2x * GLF_dead2x + GLF_dead2y * GLF_dead2y > 4.0)
    {
     break;
    }
   float GLF_dead2x_new = GLF_dead2x * GLF_dead2x - GLF_dead2y * GLF_dead2y + GLF_dead2c_re;
   if(_GLF_DEAD(false))
    return vec3(1.0);
   GLF_dead2y = 2.0 * GLF_dead2x * GLF_dead2y + GLF_dead2c_im;
   GLF_dead2x = GLF_dead2x_new;
   GLF_dead2iteration ++;
  }
 if(_GLF_DEAD(false))
  {
   if(GLF_dead2iteration < 1000)
    {
     return GLF_dead5pickColor(GLF_dead2iteration);
    }
   else
    {
     return vec3(0.0);
    }
  }
 if(GLF_dead2iteration < 1000)
  {
   return GLF_dead2pickColor(GLF_dead2iteration);
   {
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_outVarBackup_GLF_color = _GLF_color;
    _GLF_color = vec4(-7.4, 0.5, -5.7, -434.347);
    if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x)))))
     {
      _GLF_color = _GLF_outVarBackup_GLF_color;
     }
   }
  }
 else
  {
   return vec3(0.0);
  }
}
void GLF_dead3doConvert()
{
 vec3 GLF_dead3temp;
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
  {
   float donor_replacementGLF_dead6A[50];
   vec4 donor_replacementGLF_dead6_GLF_color = _GLF_FUZZED(_GLF_color.xwzy);
   {
    donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[30] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[34] / GLF_dead4resolution.y, 1.0, 1.0);
    if(_GLF_DEAD(false))
     return;
    {
     vec4 _GLF_outVarBackup_GLF_color;
     _GLF_outVarBackup_GLF_color = _GLF_color;
     _GLF_color = vec4(-896.129, -6.0, 7.1, -1.7);
     if(_GLF_WRAPPED_IF_TRUE(true))
      {
       _GLF_color = _GLF_outVarBackup_GLF_color;
      }
    }
   }
   {
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_outVarBackup_GLF_color = _GLF_color;
    _GLF_color = acosh(vec4(51.09, -80.61, 8.3, 39.47));
    if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
     {
      _GLF_color = _GLF_outVarBackup_GLF_color;
     }
   }
  }
 GLF_dead3temp = GLF_dead3b_b * (1.0 - GLF_dead3s_g) + _GLF_IDENTITY((GLF_dead3b_b - GLF_dead3b_b * (1.0 - GLF_dead3s_g)), ((GLF_dead3b_b - GLF_dead3b_b * (1.0 - GLF_dead3s_g))) * 1.0) * clamp(abs(abs(6.0 * (GLF_dead3h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
 GLF_dead3h_r = GLF_dead3temp.x;
 GLF_dead3s_g = GLF_dead3temp.y;
 GLF_dead3b_b = GLF_dead3temp.z;
}
vec3 GLF_dead3computeColor(float GLF_dead3c, vec2 GLF_dead3position)
{
 GLF_dead3h_r = fract(GLF_dead3c);
 GLF_dead3s_g = 1.0;
 GLF_dead3b_b = (0.5 + (sin(GLF_dead3time) * 0.5 + 0.5));
 GLF_dead3doConvert();
 GLF_dead3s_g *= 1.0 / GLF_dead3position.y;
 GLF_dead3h_r *= 1.0 / GLF_dead3position.x;
 if(abs(GLF_dead3position.y - GLF_dead3position.x) < 0.5)
  {
   GLF_dead3b_b = clamp(0.0, 1.0, GLF_dead3b_b * 3.0);
   if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0)))))
    return vec3(1.0);
  }
 return vec3(GLF_dead3h_r, GLF_dead3s_g, GLF_dead3b_b);
}
vec3 GLF_dead3defaultColor()
{
 return vec3(0.0);
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = uintBitsToFloat(uvec4(133890u, 44279u, 129626u, 33858u));
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
}
vec3 GLF_dead3drawShape(vec2 GLF_dead3pos, vec2 GLF_dead3square, vec3 GLF_dead3setting)
{
 bool GLF_dead3c1 = GLF_dead3pos.x - GLF_dead3setting.x < GLF_dead3square.x;
 if(! GLF_dead3c1)
  {
   if(_GLF_DEAD(false))
    return vec3(1.0);
   return GLF_dead3defaultColor();
  }
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = min(vec4(66.26, 613.508, -802.060, 69.37), vec4(4.8, 2.7, 243.805, -4.9));
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 bool GLF_dead3c2 = GLF_dead3pos.x + GLF_dead3setting.x > GLF_dead3square.x;
 if(! _GLF_IDENTITY(GLF_dead3c2, false || (_GLF_IDENTITY(GLF_dead3c2, false || (GLF_dead3c2)))))
  {
   return GLF_dead3defaultColor();
   if(_GLF_DEAD(false))
    {
     int donor_replacementGLF_dead5i = _GLF_FUZZED(ivec3(-15341, 946, 71996)[2]);
     {
      return vec3(float(donor_replacementGLF_dead5i) / 50.0, float(donor_replacementGLF_dead5i) / 120.0, float(donor_replacementGLF_dead5i) / 140.0);
     }
    }
  }
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(11.82, 522.532, 5365.5658, -29.57);
  if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 bool GLF_dead3c3 = GLF_dead3pos.y - GLF_dead3setting.x < GLF_dead3square.y;
 if(! _GLF_IDENTITY(GLF_dead3c3, (GLF_dead3c3) && _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
  {
   return GLF_dead3defaultColor();
  }
 bool GLF_dead3c4 = GLF_dead3pos.y + GLF_dead3setting.x > GLF_dead3square.y;
 if(! GLF_dead3c4)
  {
   return GLF_dead3defaultColor();
  }
 bool GLF_dead3c5 = GLF_dead3pos.x - (GLF_dead3setting.x - GLF_dead3setting.y) < GLF_dead3square.x;
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = pow(cos(tan(vec4(-0.4, 5.4, 73.06, -5325.6187))), (vec4(-1.3, 641.326, 1.3, -4.2) + vec4(-65.42, 82.84, 1.1, 1.9)));
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 if(! GLF_dead3c5)
  {
   return GLF_dead3computeColor(GLF_dead3setting.z / 40.0, GLF_dead3pos);
  }
 bool GLF_dead3c6 = GLF_dead3pos.x + (GLF_dead3setting.x - GLF_dead3setting.y) > _GLF_IDENTITY(GLF_dead3square.x, mix(float(GLF_dead3square.x), float(_GLF_FUZZED(vec3(9.0, -11.42, 7.5).p)), bool(false)));
 if(! GLF_dead3c6)
  {
   return GLF_dead3computeColor(GLF_dead3setting.z / 40.0, GLF_dead3pos);
  }
 bool GLF_dead3c7 = GLF_dead3pos.y - (GLF_dead3setting.x - GLF_dead3setting.y) < GLF_dead3square.y;
 if(! GLF_dead3c7)
  {
   {
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_outVarBackup_GLF_color = _GLF_color;
    _GLF_color = floor((vec4(81.60, 39.60, 9.9, -259.231) - vec4(5.3, 0.0, -937.021, 6040.4086)));
    if(_GLF_WRAPPED_IF_TRUE(true))
     {
      _GLF_color = _GLF_outVarBackup_GLF_color;
     }
   }
   return GLF_dead3computeColor(GLF_dead3setting.z / 40.0, GLF_dead3pos);
  }
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(-6.4, -2430.1299, -47.07, 35.48);
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
  {
   if(_GLF_DEAD(_GLF_IDENTITY(false, ! (_GLF_IDENTITY(! (_GLF_IDENTITY(false, (false) && true)), (! (_GLF_IDENTITY(false, (false) && true))) && true)))))
    return vec3(1.0);
   return vec3(1.0);
  }
 bool GLF_dead3c8 = GLF_dead3pos.y + (GLF_dead3setting.x - GLF_dead3setting.y) > GLF_dead3square.y;
 if(! GLF_dead3c8)
  {
   if(_GLF_DEAD(false))
    {
     _GLF_color = vec4(-491.577, 0.4, -5.4, 52.26);
    }
   return GLF_dead3computeColor(GLF_dead3setting.z / 40.0, GLF_dead3pos);
  }
 return GLF_dead3defaultColor();
 if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0)))))
  {
   float donor_replacementGLF_dead7b = _GLF_FUZZED(GLF_dead3time);
   {
    _GLF_IDENTITY(GLF_dead4gl_FragCoord.y, min(GLF_dead4gl_FragCoord.y, _GLF_IDENTITY(GLF_dead4gl_FragCoord.y, clamp(GLF_dead4gl_FragCoord.y, GLF_dead4gl_FragCoord.y, _GLF_IDENTITY(GLF_dead4gl_FragCoord.y, max(GLF_dead4gl_FragCoord.y, GLF_dead4gl_FragCoord.y)))))) < resolution.y / 2.0 ? GLF_dead3b_b > donor_replacementGLF_dead7b : GLF_dead3b_b < donor_replacementGLF_dead7b;
    {
     vec4 _GLF_outVarBackup_GLF_color;
     _GLF_outVarBackup_GLF_color = _GLF_color;
     _GLF_color = tanh(vec4(15.70, -190.370, -76.55, 486.614));
     if(_GLF_WRAPPED_IF_TRUE(true))
      {
       _GLF_color = _GLF_outVarBackup_GLF_color;
      }
    }
   }
  }
}
float nb_mod(float limit, float ref)
{
 float s = 0.0;
 for(
     int i = 1;
     i < 800;
     i ++
 )
  {
   if(_GLF_DEAD(false))
    {
     float donor_replacementGLF_dead1A[50];
     if((4 * (i / 4)) == i)
      {
       donor_replacementGLF_dead1A[(i / 4) >= 0 && (i / 4) < 50 ? i / 4 : 0] = float(_GLF_IDENTITY(i, (i) ^ 0));
      }
    }
   if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
    continue;
   if(_GLF_DEAD(false))
    continue;
   if(mod(float(i), ref) <= 0.01)
    {
     s += 0.2;
     {
      vec4 _GLF_outVarBackup_GLF_color;
      if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
       {
        vec3 donor_replacementGLF_dead5data[16];
        mediump vec4 donor_replacementGLF_dead5gl_FragCoord = _GLF_FUZZED(acos(clamp(_GLF_IDENTITY(vec4(49.53, -1.9, 5787.4190, 7729.8400), min(vec4(49.53, -1.9, 5787.4190, 7729.8400), vec4(49.53, -1.9, 5787.4190, 7729.8400))), GLF_dead3time, s)));
        int donor_replacementGLF_dead5i = _GLF_FUZZED(max(-73182, 28488));
        int donor_replacementGLF_dead5j = _GLF_FUZZED(i);
        {
         donor_replacementGLF_dead5data[(4 * donor_replacementGLF_dead5j + donor_replacementGLF_dead5i) >= 0 && (4 * donor_replacementGLF_dead5j + donor_replacementGLF_dead5i) < 16 ? 4 * donor_replacementGLF_dead5j + donor_replacementGLF_dead5i : 0] = GLF_dead5mand(donor_replacementGLF_dead5gl_FragCoord.x + float(donor_replacementGLF_dead5i - 1), donor_replacementGLF_dead5gl_FragCoord.y + float(donor_replacementGLF_dead5j - 1));
        }
       }
      _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_color) * mat4(1.0));
      {
       vec4 _GLF_outVarBackup_GLF_color;
       _GLF_outVarBackup_GLF_color = _GLF_color;
       _GLF_color = vec4(5.7, -872.841, -4.7, 312.294);
       if(_GLF_WRAPPED_IF_TRUE(true))
        {
         _GLF_color = _GLF_outVarBackup_GLF_color;
        }
      }
      _GLF_color = vec4(-6.6, 984.509, 69.41, 6.0);
      if(_GLF_DEAD(false))
       {
        _GLF_color = vec4(-817.091, -4481.3793, -529.343, -4.2);
       }
      if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0)))))
       {
        {
         vec4 _GLF_outVarBackup_GLF_color;
         _GLF_outVarBackup_GLF_color = _GLF_color;
         _GLF_color = vec4(821.237, -2.4, 8506.5020, -6.2);
         if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
          {
           _GLF_color = _GLF_outVarBackup_GLF_color;
          }
        }
        _GLF_color = _GLF_outVarBackup_GLF_color;
       }
     }
    }
   if(float(_GLF_IDENTITY(i, max(i, _GLF_IDENTITY(i, clamp(i, i, i))))) >= limit)
    {
     return _GLF_IDENTITY(s, (s) - 0.0);
    }
   {
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_outVarBackup_GLF_color = _GLF_color;
    _GLF_color = vec4(-4649.1438, 9.6, 262.794, 0.6);
    if(_GLF_WRAPPED_IF_TRUE(true))
     {
      if(_GLF_DEAD(_GLF_FALSE(_GLF_IDENTITY(false, ! (! (false))), (injectionSwitch.x > injectionSwitch.y))))
       {
        {
         if(_GLF_DEAD(false))
          continue;
         GLF_dead2pickColor(i);
        }
       }
      _GLF_color = _GLF_outVarBackup_GLF_color;
      if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x)))))
       {
        _GLF_color = vec4(dFdx(vec2(7231.7865, -1.8)), vec2(_GLF_IDENTITY(-9.0, (true ? -9.0 : _GLF_FUZZED(ref))), 6.8).g, 4.5);
       }
     }
   }
   if(_GLF_DEAD(false))
    {
     vec4 donor_replacementGLF_dead7_GLF_color = _GLF_FUZZED(vec4(6.3, -49.04, 4745.5616, -3.8));
     float donor_replacementGLF_dead7data[10];
     {
      donor_replacementGLF_dead7_GLF_color = vec4(donor_replacementGLF_dead7data[5] / 10.0, donor_replacementGLF_dead7data[9] / 10.0, donor_replacementGLF_dead7data[0] / _GLF_IDENTITY(10.0, max(10.0, 10.0)), 1.0);
     }
    }
   {
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_outVarBackup_GLF_color = _GLF_color;
    _GLF_color = vec4(-1.5, -4634.1625, -3.2, -47.09);
    if(_GLF_WRAPPED_IF_TRUE(true))
     {
      _GLF_color = _GLF_outVarBackup_GLF_color;
     }
   }
  }
 return s;
}
void main()
{
 vec4 c = vec4(0.0, 0.0, 0.0, 1.0);
 float ref = floor(resolution.x / 8.0);
 c.x = nb_mod(gl_FragCoord.x, ref);
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(72.67, -71.45, 152.237, -3.0);
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 c.y = nb_mod(_GLF_IDENTITY(gl_FragCoord.y, mix(float(_GLF_FUZZED(199.195)), float(gl_FragCoord.y), bool(true))), ref);
 c.z = c.x + c.y;
 if(_GLF_DEAD(false))
  return;
 for(
     int i = 0;
     i < 3;
     i ++
 )
  {
   if(_GLF_DEAD(false))
    {
     vec3 donor_replacementGLF_dead3d = _GLF_FUZZED(vec3(-5.2, 4.7, -120.622));
     if(length(donor_replacementGLF_dead3d) <= 0.0)
      {
       if(_GLF_DEAD(false))
        {
         {
          vec4 _GLF_outVarBackup_GLF_color;
          _GLF_outVarBackup_GLF_color = _GLF_color;
          _GLF_color = vec4(498.860, -891.763, -8.6, 49.90);
          if(_GLF_WRAPPED_IF_TRUE(true))
           {
            _GLF_color = _GLF_outVarBackup_GLF_color;
           }
         }
         break;
        }
       continue;
      }
    }
   if(_GLF_DEAD(false))
    {
     _GLF_color = faceforward(vec4(64.68, 1484.0420, -61.53, -79.19), vec4(65.36, vec3(-8.0, -3573.8352, -4.6)), floor(vec4(-8.8, 0.1, 7.8, -601.548)));
    }
   switch(_GLF_SWITCH(0))
    {
     case 0:
     if(_GLF_DEAD(false))
      {
       switch(_GLF_SWITCH(0))
        {
         case 61:
         false;
         case 65:
         bvec4(true, false, false, false);
         if(_GLF_DEAD(false))
          continue;
         if(_GLF_DEAD(false))
          {
           bool donor_replacementGLF_dead8c5 = _GLF_FUZZED((bitfieldExtract(i, i, 74768) < -77455));
           vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(resolution);
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(4.1, -4126.7550, -1.2, -5420.5976);
            if(_GLF_WRAPPED_IF_TRUE(true))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(mod(vec3(4.1, 3262.7778, -48.73), vec3(6754.2343, -9537.4730, 8.0)));
           if(! donor_replacementGLF_dead8c5)
            {
             GLF_dead8computeColor(donor_replacementGLF_dead8setting.z / 40.0, donor_replacementGLF_dead8pos);
            }
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = abs(vec4(-8168.0874, -13.18, 314.377, 4.8));
            if(_GLF_WRAPPED_IF_TRUE(true))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
          }
         case 0:
         case 34:
         {
          vec4 _GLF_outVarBackup_GLF_color;
          _GLF_outVarBackup_GLF_color = _GLF_color;
          _GLF_color = vec4(998.455, 2.4, -99.61, -3.8);
          if(_GLF_WRAPPED_IF_TRUE(true))
           {
            _GLF_color = _GLF_outVarBackup_GLF_color;
           }
         }
         case 70:
         if(_GLF_DEAD(false))
          {
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(vec2(-52.18, -4.0), reflect(vec2(7.2, 3426.0179), vec2(-224.272, -0.2))) * vec4(-4.9, -330.990, 49.15, 4.0));
            if(_GLF_WRAPPED_IF_TRUE(true))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           return;
          }
         if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
          {
           _GLF_color = vec4(3627.3208, 5829.0482, -4.4, 195.396);
          }
         float donor_replacementGLF_dead0limit = _GLF_FUZZED(ref);
         {
          vec4 _GLF_outVarBackup_GLF_color;
          _GLF_outVarBackup_GLF_color = _GLF_color;
          _GLF_color = reflect(roundEven(vec4(-0.1, 1.4, -5.3, -6.8)), vec4(8.5, 3.7, -36.32, 1377.0087));
          if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
           {
            _GLF_color = _GLF_outVarBackup_GLF_color;
           }
         }
         {
          {
           vec4 _GLF_outVarBackup_GLF_color;
           _GLF_outVarBackup_GLF_color = _GLF_color;
           _GLF_color = mix(faceforward(vec4(9.0, -3.6, -187.503, 641.649), vec4(-466.398, 607.704, -210.812, -25.10), vec4(95.52, 6187.6592, -3990.3460, -56.36)), vec4(-7682.4024, 361.411, 0.9, 4.7), radians(15.26));
           if(_GLF_WRAPPED_IF_TRUE(true))
            {
             _GLF_color = _GLF_outVarBackup_GLF_color;
            }
          }
          float GLF_dead0s = 0.0;
          for(
              int GLF_dead0i = 1;
              GLF_dead0i < 800;
              _GLF_IDENTITY(GLF_dead0i ++, (GLF_dead0i ++) << 0)
          )
           {
            if(mod(float(GLF_dead0i), ref) <= 0.01)
             {
              GLF_dead0s += 0.2;
             }
            if(float(GLF_dead0i) >= donor_replacementGLF_dead0limit)
             {
              GLF_dead0s;
             }
            if(_GLF_DEAD(false))
             {
              _GLF_color = cos(vec4(35.36, 213.520, 6.7, -46.28));
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = vec4(-13.43, -8.2, -3953.1268, 7120.4845);
               if(_GLF_WRAPPED_IF_TRUE(true))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
             }
            if(_GLF_DEAD(false))
             {
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = (-851.133 - refract((mat2x4(-50.75, -642.768, -97.90, -5.2, 4795.9613, 330.110, -8.6, 83.35) * vec2(-26.11, -1.8)), vec4(810.613, -133.867, -8.0, -29.41), -3367.9225));
               if(_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, ! (! (true)))))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
              float donor_replacementGLF_dead4data[10];
              for(
                  int GLF_dead4i = 0;
                  GLF_dead4i < 10;
                  GLF_dead4i ++
              )
               {
                donor_replacementGLF_dead4data[(GLF_dead4i) >= 0 && (GLF_dead4i) < 10 ? GLF_dead4i : 0] = float(10 - GLF_dead4i) * injectionSwitch.y;
               }
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = vec4(log2(normalize(9.9)), fwidth(vec3(38.54, -5.5, -65.75)));
               if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
             }
            if(_GLF_DEAD(false))
             {
              _GLF_color = ldexp((vec4(-3162.8162, -0.3, -3.6, 16.01) * mat4(56.53, 9820.0601, 332.220, -2098.4930, -884.428, -322.715, -0.1, -5.1, -934.968, 6.9, 5389.3281, 6.0, 82.16, 610.870, -7.4, -9.3)), ivec4(30231, 41554, 84490, -72072));
             }
           }
          GLF_dead0s;
         }
         break;
         case 14:
         if(_GLF_DEAD(false))
          {
           _GLF_color = max(vec4(-3173.3637, 5.0, 2.6, -8990.3479), 583.346);
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(5.3, -7.9, 70.81, 9.7);
            if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
          }
         if(_GLF_DEAD(false))
          discard;
         length(vec3(-0.4, 9314.8943, 0.0));
         default:
         {
          vec4 _GLF_outVarBackup_GLF_color;
          _GLF_outVarBackup_GLF_color = _GLF_color;
          _GLF_color = (mat4(8.4, 5.0, 6769.8690, 5437.6126, 730.483, -5.8, 0.3, 9.4, -49.94, -99.04, -3.2, -305.953, -5.1, 9.6, 8.0, 9.6) * min(vec4(-3546.0661, 592.647, 2.2, 1530.5248), 6.3));
          if(_GLF_WRAPPED_IF_TRUE(true))
           {
            _GLF_color = _GLF_outVarBackup_GLF_color;
           }
         }
         1;
        }
      }
     case 17:
     if(c[i] >= 1.0)
      {
       c[i] = c[i] * c[i];
      }
     {
      vec4 _GLF_outVarBackup_GLF_color;
      _GLF_outVarBackup_GLF_color = _GLF_color;
      _GLF_color = vec4(7.3, 647.799, -4538.9486, -5100.3077);
      if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
       {
        _GLF_color = _GLF_outVarBackup_GLF_color;
       }
     }
     {
      {
       vec4 _GLF_outVarBackup_GLF_color;
       _GLF_outVarBackup_GLF_color = _GLF_color;
       _GLF_color = vec4(-2756.3487, -5.9, -420.007, -82.89);
       if(_GLF_WRAPPED_IF_TRUE(true))
        {
         _GLF_color = _GLF_outVarBackup_GLF_color;
        }
      }
      vec4 _GLF_outVarBackup_GLF_color;
      _GLF_outVarBackup_GLF_color = _GLF_color;
      _GLF_color = (min(vec4(33.35, 565.448, -6.5, -7.6), vec4(568.057, 889.095, 817.391, 9572.9520)) / _GLF_IDENTITY(_GLF_IDENTITY(-1855.3569, (true ? -1855.3569 : _GLF_FUZZED((ref --)))), clamp(-1855.3569, -1855.3569, -1855.3569)));
      if(_GLF_DEAD(false))
       {
        {
         vec4 _GLF_outVarBackup_GLF_color;
         _GLF_outVarBackup_GLF_color = _GLF_color;
         _GLF_color = vec4(-515.892, 431.782, 235.335, -19.75);
         if(_GLF_WRAPPED_IF_TRUE(true))
          {
           _GLF_color = _GLF_outVarBackup_GLF_color;
          }
        }
        vec2 donor_replacementGLF_dead3center = _GLF_FUZZED(vec3(-4.9, -37.30, -662.160).rg);
        vec2 donor_replacementGLF_dead3position = _GLF_FUZZED(sign(injectionSwitch));
        if(_GLF_DEAD(false))
         continue;
        if(_GLF_DEAD(false))
         break;
        vec3 donor_replacementGLF_dead3result = _GLF_FUZZED((_GLF_IDENTITY(mat4x3(-60.19, -41.36, 7833.3740, 0.7, -49.03, -0.0, 34.74, 521.750, -738.818, 10.30, -359.551, -52.07) * _GLF_outVarBackup_GLF_color, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(vec3(3.9, 713.558, -54.96)) : mat4x3(-60.19, -41.36, 7833.3740, 0.7, -49.03, -0.0, 34.74, 521.750, -738.818, 10.30, -359.551, -52.07) * _GLF_outVarBackup_GLF_color))).ggr);
        float donor_replacementGLF_dead3time = _GLF_FUZZED(269.353);
        for(
            int GLF_dead3i = 35;
            GLF_dead3i >= 0;
            GLF_dead3i --
        )
         {
          vec3 GLF_dead3d;
          GLF_dead3d = GLF_dead3drawShape(donor_replacementGLF_dead3position, donor_replacementGLF_dead3center + vec2(sin(float(GLF_dead3i) / 10.0 + donor_replacementGLF_dead3time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_dead3i) / 100.0), 0.01, float(GLF_dead3i)));
          if(length(GLF_dead3d) <= 0.0)
           {
            continue;
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = vec4(-2580.7031, 82.48, -31.13, 80.08);
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
           }
          donor_replacementGLF_dead3result = vec3(GLF_dead3d);
         }
       }
      {
       vec4 _GLF_outVarBackup_GLF_color;
       _GLF_outVarBackup_GLF_color = _GLF_color;
       _GLF_color = vec4(-3.5, -0.4, 6.9, 969.790);
       if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.x >= _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), 0.0 + (dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))), true && (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), 0.0 + (dot(vec2(1.0, 1.0), vec2(0.0, 0.0)))))))))))
        {
         _GLF_color = _GLF_outVarBackup_GLF_color;
         if(_GLF_DEAD(false))
          {
           float donor_replacementGLF_dead1A[50];
           vec4 donor_replacementGLF_dead1_GLF_color = _GLF_FUZZED((exp(_GLF_outVarBackup_GLF_color) * 2.8));
           {
            donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[35] / resolution.x, donor_replacementGLF_dead1A[39] / resolution.y, 1.0, 1.0);
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = vec4(7211.5669, 4743.4176, -8.2, 43.95);
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
           }
          }
         if(_GLF_DEAD(false))
          {
           float donor_replacementGLF_dead6A[50];
           vec4 donor_replacementGLF_dead6_GLF_color = _GLF_FUZZED(sqrt(_GLF_color));
           {
            donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[30] / resolution.x, donor_replacementGLF_dead6A[34] / resolution.y, 1.0, 1.0);
           }
          }
        }
      }
      if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
       {
        _GLF_color = _GLF_outVarBackup_GLF_color;
        {
         vec4 _GLF_outVarBackup_GLF_color;
         _GLF_outVarBackup_GLF_color = _GLF_color;
         if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
          {
           mediump vec4 donor_replacementGLF_dead3gl_FragCoord = _GLF_FUZZED(c);
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(32.10, 6.5, -1.7, -9.0);
            if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           mat2 donor_replacementGLF_dead3rotationMatrix = _GLF_FUZZED(mat2(vec2(9.8, -46.18), resolution));
           float donor_replacementGLF_dead3time = _GLF_FUZZED(pow(ref, ref));
           {
            vec2 GLF_dead3aspect;
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = vec4(-3.3, 3.7, 8.5, 80.77);
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            if(_GLF_DEAD(false))
             {
              float donor_replacementGLF_dead6A[50];
              {
               if(i < int(GLF_dead4gl_FragCoord.x))
                {
                 break;
                }
               if(i > 0)
                {
                 donor_replacementGLF_dead6A[(i) >= 0 && (i) < 50 ? i : 0] += donor_replacementGLF_dead6A[(i - 1) >= 0 && (i - 1) < 50 ? i - 1 : 0];
                }
              }
             }
            GLF_dead3aspect = injectionSwitch.xy / min(injectionSwitch.x, injectionSwitch.y);
            vec2 GLF_dead3position;
            GLF_dead3position = (donor_replacementGLF_dead3gl_FragCoord.xy / injectionSwitch.xy) * GLF_dead3aspect;
            vec2 GLF_dead3center;
            GLF_dead3center = vec2(0.5) * GLF_dead3aspect;
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = max(vec4(-446.043, -9985.4698, 82.42, 9.5), -5.5);
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            GLF_dead3position *= donor_replacementGLF_dead3rotationMatrix;
            GLF_dead3center *= donor_replacementGLF_dead3rotationMatrix;
            vec3 GLF_dead3result = vec3(0.0);
            for(
                int GLF_dead3i = 35;
                GLF_dead3i >= 0;
                GLF_dead3i --
            )
             {
              vec3 GLF_dead3d;
              GLF_dead3d = GLF_dead3drawShape(GLF_dead3position, GLF_dead3center + vec2(sin(float(GLF_dead3i) / 10.0 + donor_replacementGLF_dead3time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_dead3i) / 100.0), 0.01, float(GLF_dead3i)));
              if(length(GLF_dead3d) <= 0.0)
               {
                continue;
               }
              GLF_dead3result = vec3(GLF_dead3d);
             }
            GLF_dead3result;
           }
          }
         _GLF_color = vec4(-2313.4803, 33.17, -99.78, -182.318);
         if(_GLF_DEAD(false))
          {
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-9.0, -99.83, 4102.5799, -9.9);
            if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           bool donor_replacementGLF_dead3c3 = _GLF_FUZZED(true);
           if(! donor_replacementGLF_dead3c3)
            {
             GLF_dead3defaultColor();
            }
          }
         if(_GLF_WRAPPED_IF_TRUE(true))
          {
           _GLF_color = _GLF_outVarBackup_GLF_color;
          }
        }
        if(_GLF_DEAD(false))
         {
          for(
              int GLF_dead0i = 0;
              GLF_dead0i < 3;
              GLF_dead0i ++
          )
           {
            {
             {
              vec4 _GLF_outVarBackup_GLF_color;
              _GLF_outVarBackup_GLF_color = _GLF_color;
              _GLF_color = clamp(vec4(330.823, 7.4, 6314.6490, -19.10), vec4(1.1, -3.8, 317.054, 215.262), vec4(-25.23, 261.358, 6.1, 1.9));
              if(_GLF_WRAPPED_IF_TRUE(true))
               {
                _GLF_color = _GLF_outVarBackup_GLF_color;
               }
             }
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = (mat2x4(4.0, 8.6, -45.30, 0.4, -6.3, -5854.4672, -8.0, 81.53) * vec4(-11.86, 6.7, 43.83, 8.8).gb);
             if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            if(c[(GLF_dead0i) >= 0 && (GLF_dead0i) < 4 ? GLF_dead0i : 0] >= 1.0)
             {
              c[(GLF_dead0i) >= 0 && (GLF_dead0i) < 4 ? GLF_dead0i : 0] = c[(GLF_dead0i) >= 0 && (GLF_dead0i) < 4 ? GLF_dead0i : 0] * c[_GLF_IDENTITY((GLF_dead0i), (true ? _GLF_IDENTITY((GLF_dead0i), 0 | ((GLF_dead0i))) : _GLF_FUZZED(GLF_dead0i))) >= 0 && (GLF_dead0i) < 4 ? _GLF_IDENTITY(GLF_dead0i, min(GLF_dead0i, GLF_dead0i)) : 0];
             }
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = ((2908.1189 - (vec4(4.3, 9366.4957, 5.5, 4876.8727))) + vec4(-418.232, -60.33, -3.2, 7.2));
             if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
           }
          {
           switch(_GLF_SWITCH(0))
            {
             case 88:
             (195137u << bitfieldReverse(79886u));
             case 0:
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = (- vec4(-6.5, -2.7, -7.8, 7.1));
             {
              vec4 _GLF_outVarBackup_GLF_color;
              _GLF_outVarBackup_GLF_color = _GLF_color;
              _GLF_color = vec4(-4372.4251, -2.0, 6.7, -6464.3997).psqp;
              if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
               {
                _GLF_color = _GLF_outVarBackup_GLF_color;
               }
             }
             if(_GLF_DEAD(false))
              break;
             case 33:
             case 80:
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
             break;
             default:
             if(_GLF_DEAD(false))
              break;
             1;
            }
          }
         }
       }
     }
     break;
     case 38:
     for(
         mat3x4((mat2(-11.49, 1.8, 71.21, -9.8) / ref));
         bool(uint(-91738));
         ivec3(-93718, -42237, -87878)
     )
      {
       if(((uvec4(174186u, 120098u, 149833u, 93424u) == uvec4(95511u, 17788u, 168292u, 139316u)) ? true : bvec4(false, false, _GLF_IDENTITY(true, (true) && true), true)[2]))
        {
         (mat2x4(c, vec4(43.43, -8703.3070, -9.2, 1.9)) / (_GLF_IDENTITY(ref, max(ref, ref))));
         {
          if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
           continue;
          uvec2 _GLF_SWITCH_0_0v, _GLF_SWITCH_0_1v[89], _GLF_SWITCH_0_2v[51];
          if(false)
           {
            bvec3(false, true, true);
            uint _GLF_SWITCH_0_3v, _GLF_SWITCH_0_4v;
            discard;
            (vec3(191.628, 7.0, 6.6) * -2435.0585);
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = step(-3.5, exp(vec4(5.2, _GLF_IDENTITY(-57.35, max(-57.35, _GLF_IDENTITY(-57.35, 0.0 + (-57.35)))), 5.6, 6.9)));
             {
              vec4 _GLF_outVarBackup_GLF_color;
              _GLF_outVarBackup_GLF_color = _GLF_color;
              _GLF_color = vec4(480.850, -5724.7498, 31.17, -476.899);
              if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0)))))
               {
                _GLF_color = _GLF_outVarBackup_GLF_color;
               }
             }
             if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
              {
               float donor_replacementGLF_dead6A[50];
               for(
                   int GLF_dead6i = 0;
                   GLF_dead6i < 200;
                   GLF_dead6i ++
               )
                {
                 if(GLF_dead6i >= int(GLF_dead4resolution.x))
                  {
                   break;
                  }
                 if((4 * (GLF_dead6i / 4)) == GLF_dead6i)
                  {
                   donor_replacementGLF_dead6A[(GLF_dead6i / 4) >= 0 && (GLF_dead6i / 4) < 50 ? GLF_dead6i / 4 : 0] = float(GLF_dead6i);
                  }
                }
              }
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            bvec2 _GLF_SWITCH_0_5v, _GLF_SWITCH_0_6v, _GLF_SWITCH_0_7v;
            bvec3(_GLF_SWITCH_0_5v, true);
            mat2x3(_GLF_IDENTITY(ref, 0.0 + (ref)));
           }
          do
           {
            if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
             break;
            {
             switch(_GLF_SWITCH(0))
              {
               case 21:
               if(_GLF_DEAD(false))
                {
                 _GLF_color = (vec4(6.9, 70.45, -417.420, 9.9) * -8.1);
                }
               greaterThan(ivec2(78318, 90004), ivec2(-94060, -85181));
               case 59:
               mat4x2(7749.0689, 52.89, -4726.6540, 35.39, 21.26, 6841.7307, -4.6, -380.665);
               case 0:
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(158.668, -6.6, -818.364, 4.8);
                if(_GLF_WRAPPED_IF_TRUE(true))
                 {
                  _GLF_color = _GLF_outVarBackup_GLF_color;
                 }
               }
               _GLF_color = vec4(65.07, -8537.6138, 46.61, -2571.7964);
               if(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, (gl_FragCoord.x < 0.0) && true)))))
                {
                 _GLF_color = vec4(5.5, 0.3, -3647.1021, -441.527);
                 if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
                  {
                   _GLF_color = vec4(1898.8202, -97.37, 5.4, 3.0);
                  }
                }
               if(_GLF_WRAPPED_IF_TRUE(true))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
               break;
               case 9:
               if(_GLF_DEAD(false))
                {
                 _GLF_color = vec4(-47.05, 570.896, -15.26, -9.7);
                }
               discard;
               case 86:
               if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
                {
                 _GLF_color = vec4(-74.58, -363.855, -448.432, -749.393);
                }
               uvec3(90617u, 98379u, 147956u);
               if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
                {
                 {
                  vec3(0.0);
                 }
                }
               default:
               1;
               if(_GLF_DEAD(false))
                break;
              }
            }
           }
          while(bvec3(true, true, true)[1]);
         }
        }
       else
        {
         for(
             (mat4x2(-112.364, 5753.3718, 5338.0960, -847.135, -413.381, 9126.8517, 6.3, 0.5) != (mat2(-173.806, -2.2, -1222.5448, -76.98) * mat4x2(-733.998, -13.13, -9.0, -56.18, _GLF_IDENTITY(-1689.6747, 1.0 * (-1689.6747)), -4049.9557, -9463.2538, 1.4)));
             false;
             mat4x3(-9710.2555, -7.2, -9738.0420, -96.16, 3.2, 74.35, 8.5, 678.174, _GLF_IDENTITY(-0.9, (false ? _GLF_FUZZED(GLF_dead3b_b) : _GLF_IDENTITY(-0.9, 1.0 * (-0.9)))), 6.1, -713.998, 2.4)
         )
          {
           if(true)
            {
             if(_GLF_DEAD(false))
              return;
             mat2(81.75, 8487.4491, -8.1, 410.524);
            }
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = tanh(cos(vec4(979.995, 5602.6201, 0.4, 3.1)));
            if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           bool _GLF_SWITCH_0_8v, _GLF_SWITCH_0_9v, _GLF_SWITCH_0_10v[80];
           if(_GLF_DEAD(false))
            {
             {
              GLF_dead3defaultColor();
             }
            }
           for(
               findLSB(-72434);
               _GLF_SWITCH_0_9v;
               injectionSwitch
           )
            {
             resolution;
             ;
             {
              vec4 _GLF_outVarBackup_GLF_color;
              _GLF_outVarBackup_GLF_color = _GLF_color;
              _GLF_color = vec4(-4651.6650, -8.1, -81.24, 8857.5056);
              if(_GLF_WRAPPED_IF_TRUE(true))
               {
                _GLF_color = _GLF_outVarBackup_GLF_color;
               }
             }
             (vec4(-9950.4616, 936.287, _GLF_IDENTITY(-285.892, (false ? _GLF_FUZZED(dFdx(atan(-75.57))) : -285.892)), 8519.3293) / c);
             mat4 _GLF_SWITCH_0_11v[10];
             (mat3x2(21.64, -429.097, -4416.1289, 75.40, -1.7, -7.4));
             {
              vec4 _GLF_outVarBackup_GLF_color;
              if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
               {
                if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
                 {
                  _GLF_color = faceforward(vec3(5.0, -1595.5277, 7812.5175), cross(vec3(9609.4834, -9670.2382, 223.338), vec3(7204.6297, -1.8, 7.3)), vec3(-36.55, 436.109, -19.49)).ppts;
                 }
                if(ref * ref + ref * ref > 4.0)
                 {
                  break;
                 }
               }
              if(_GLF_DEAD(false))
               {
                vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(injectionSwitch);
                vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED((vec3(-9402.2914, 568.945, 3.3)));
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = vec4(1.2, -902.314, 641.661, 2.5);
                 if(_GLF_WRAPPED_IF_TRUE(true))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
                {
                 GLF_dead8computeColor(donor_replacementGLF_dead8setting.z / 40.0, donor_replacementGLF_dead8pos);
                }
               }
              _GLF_outVarBackup_GLF_color = _GLF_color;
              _GLF_color = (mat4(-610.254, -6.2, -8.5, 964.832, 3927.8138, -9.6, -660.346, -779.276, 277.474, 63.57, 9.1, -9.3, 2.0, 6284.2287, -642.780, 269.488) * vec4(47.40, -5.1, _GLF_IDENTITY(-8.8, (-8.8) * 1.0), 418.393));
              if(_GLF_DEAD(false))
               {
                float donor_replacementGLF_dead7a = _GLF_FUZZED(GLF_dead3s_g);
                float donor_replacementGLF_dead7b = _GLF_FUZZED(GLF_dead3time);
                {
                 GLF_dead4gl_FragCoord.y < resolution.y / 2.0 ? donor_replacementGLF_dead7a > donor_replacementGLF_dead7b : donor_replacementGLF_dead7a < donor_replacementGLF_dead7b;
                }
               }
              if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
               {
                _GLF_color = _GLF_outVarBackup_GLF_color;
               }
             }
            }
          }
         53174u;
        }
       uint _GLF_SWITCH_0_12v, _GLF_SWITCH_0_13v[53], _GLF_SWITCH_0_14v;
       if(_GLF_DEAD(false))
        {
         float donor_replacementGLF_dead1A[50];
         vec4 donor_replacementGLF_dead1_GLF_color = _GLF_FUZZED(smoothstep(-17.50, ref, _GLF_color));
         mediump vec4 donor_replacementGLF_dead1gl_FragCoord = _GLF_FUZZED(vec4(-19.13, -80.54, -5.4, _GLF_IDENTITY(7.4, max(7.4, 7.4))));
         if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 80)
          {
           donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[15] / resolution.x, donor_replacementGLF_dead1A[19] / resolution.y, 1.0, 1.0);
          }
         else
          if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 100)
           {
            donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[20] / resolution.x, donor_replacementGLF_dead1A[24] / resolution.y, 1.0, 1.0);
           }
          else
           if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 120)
            {
             _GLF_IDENTITY(donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[25] / resolution.x, donor_replacementGLF_dead1A[29] / resolution.y, 1.0, 1.0), (false ? _GLF_FUZZED(c) : donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[25] / resolution.x, donor_replacementGLF_dead1A[29] / resolution.y, 1.0, 1.0)));
            }
           else
            if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 140)
             {
              donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[30] / resolution.x, donor_replacementGLF_dead1A[34] / resolution.y, 1.0, 1.0);
             }
            else
             if(int(donor_replacementGLF_dead1gl_FragCoord.x) < _GLF_IDENTITY(160, (true ? _GLF_IDENTITY(160, (false ? _GLF_FUZZED(i) : _GLF_IDENTITY(160, ~ (~ (160))))) : _GLF_FUZZED(-3728))))
              {
               donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[35] / resolution.x, donor_replacementGLF_dead1A[39] / resolution.y, 1.0, 1.0);
              }
             else
              if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 180)
               {
                donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[40] / resolution.x, donor_replacementGLF_dead1A[44] / resolution.y, 1.0, 1.0);
               }
              else
               if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 180)
                {
                 donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[45] / resolution.x, donor_replacementGLF_dead1A[49] / resolution.y, 1.0, 1.0);
                }
               else
                {
                 discard;
                }
         {
          vec4 _GLF_outVarBackup_GLF_color;
          _GLF_outVarBackup_GLF_color = _GLF_color;
          _GLF_color = vec4(-6.4, vec2(-6204.4087, -33.52), -6081.4284);
          if(_GLF_WRAPPED_IF_TRUE(true))
           {
            _GLF_color = _GLF_outVarBackup_GLF_color;
           }
         }
        }
       vec4 _GLF_SWITCH_0_15v, _GLF_SWITCH_0_16v, _GLF_SWITCH_0_17v;
       ((- mat3x4(-7543.9053, 720.608, -0.0, 2882.8605, -3.2, 9.5, -3.3, 12.44, -6107.6303, -42.05, 1.5, 0.3)) + mat3x4(-318.592, -459.542, -6.9, _GLF_IDENTITY(18.42, (true ? 18.42 : _GLF_FUZZED(GLF_dead3h_r))), -641.709, 122.016, -435.997, 9.8, -142.070, 571.995, -6.9, 61.63));
       {
        bvec2 _GLF_SWITCH_0_18v;
        bvec2 _GLF_SWITCH_0_19v, _GLF_SWITCH_0_20v, _GLF_SWITCH_0_21v;
        while(((mat3(-3812.2945, -1.0, -317.428, -1580.8685, 3.5, -231.297, 680.100, -4.9, -848.114) * vec3(-7568.2189, -0.7, -4.4)) != vec3(-7.3, -0.0, 2.0)))
         {
         }
        ;
        ;
        {
         if((! true))
          {
           if(_GLF_DEAD(false))
            {
             float donor_replacementGLF_dead7data[10];
             for(
                 int GLF_dead7j = 0;
                 GLF_dead7j < 10;
                 GLF_dead7j ++
             )
              {
               if(GLF_dead7j < i + 1)
                {
                 continue;
                }
               bool GLF_dead7doSwap = GLF_dead7checkSwap(donor_replacementGLF_dead7data[(i) >= 0 && (i) < 10 ? i : 0], donor_replacementGLF_dead7data[(GLF_dead7j) >= 0 && (GLF_dead7j) < 10 ? GLF_dead7j : 0]);
               if(GLF_dead7doSwap)
                {
                 float GLF_dead7temp = donor_replacementGLF_dead7data[(i) >= 0 && (i) < 10 ? i : 0];
                 donor_replacementGLF_dead7data[(i) >= 0 && (i) < 10 ? i : 0] = donor_replacementGLF_dead7data[(GLF_dead7j) >= 0 && (GLF_dead7j) < 10 ? GLF_dead7j : 0];
                 donor_replacementGLF_dead7data[(GLF_dead7j) >= 0 && (GLF_dead7j) < 10 ? GLF_dead7j : 0] = GLF_dead7temp;
                 if(_GLF_DEAD(false))
                  {
                   _GLF_color = (vec4(-938.225, 5.8, 713.402, -65.47) / pow(vec4(-8124.2143, -7.6, 5951.3545, 9489.1704), vec4(-27.33, 3.7, -5.8, -8.1)));
                  }
                }
              }
            }
           vec4 _GLF_SWITCH_0_22v[90], _GLF_SWITCH_0_23v;
           if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0)))))
            return;
           mat2 _GLF_SWITCH_0_24v, _GLF_SWITCH_0_25v, _GLF_SWITCH_0_26v;
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = smoothstep(3926.3520, (-8.0 * 60.43), vec4(-5.2, -56.36, -8379.9762, -6068.8772));
            if(_GLF_WRAPPED_IF_TRUE(true))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           discard;
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(5357.1544, 46.95, -56.57, 2.8);
            if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(determinant(mat2(0.0, 1.0, 0.0, 0.0)))))))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           mat3(67.18, -71.10, 57.84, 451.135, 3.4, 382.768, 926.617, 692.965, -8396.6385);
           mat3x4(_GLF_SWITCH_0_26v);
           discard;
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) - vec4(0.0, 0.0, 0.0, 0.0));
            _GLF_color = vec4(7109.1442, -9347.9668, -1.1, 143.215);
            if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
             {
              if(_GLF_DEAD(false))
               {
                float donor_replacementGLF_dead1A[50];
                vec4 donor_replacementGLF_dead1_GLF_color = _GLF_FUZZED(acos((+ vec4(-990.485, 7070.6283, 2151.9179, 623.492))));
                mediump vec4 donor_replacementGLF_dead1gl_FragCoord = _GLF_FUZZED(faceforward(_GLF_SWITCH_0_16v, _GLF_color, fwidth(reflect(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color))));
                if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 100)
                 {
                  donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[20] / injectionSwitch.x, donor_replacementGLF_dead1A[24] / injectionSwitch.y, 1.0, 1.0);
                  if(_GLF_DEAD(false))
                   {
                    _GLF_color = vec4(3.7, 18.82, 97.85, -81.84);
                    {
                     vec4 _GLF_outVarBackup_GLF_color;
                     _GLF_outVarBackup_GLF_color = _GLF_color;
                     _GLF_color = vec4(671.996, -946.501, 9.5, 7.2);
                     if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
                      {
                       _GLF_color = _GLF_outVarBackup_GLF_color;
                      }
                    }
                   }
                  if(_GLF_DEAD(false))
                   {
                    int donor_replacementGLF_dead7j = _GLF_FUZZED(bitfieldExtract(i, 63593, i));
                    if(donor_replacementGLF_dead7j < i + 1)
                     {
                      continue;
                      {
                       vec4 _GLF_outVarBackup_GLF_color;
                       _GLF_outVarBackup_GLF_color = _GLF_color;
                       _GLF_color = vec4(-8.3, 70.95, 6.6, 15.57);
                       if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
                        {
                         _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                      }
                     }
                   }
                 }
                else
                 if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 120)
                  {
                   donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[25] / injectionSwitch.x, donor_replacementGLF_dead1A[29] / injectionSwitch.y, 1.0, 1.0);
                  }
                 else
                  if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 140)
                   {
                    donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[30] / injectionSwitch.x, donor_replacementGLF_dead1A[34] / injectionSwitch.y, 1.0, 1.0);
                   }
                  else
                   {
                    if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
                     continue;
                    if(_GLF_IDENTITY(int(donor_replacementGLF_dead1gl_FragCoord.x) < 160, true && (_GLF_IDENTITY(int(donor_replacementGLF_dead1gl_FragCoord.x) < 160, (int(donor_replacementGLF_dead1gl_FragCoord.x) < 160) && true))))
                     {
                      donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[35] / injectionSwitch.x, donor_replacementGLF_dead1A[39] / injectionSwitch.y, 1.0, 1.0);
                     }
                    else
                     if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 180)
                      {
                       donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[40] / injectionSwitch.x, donor_replacementGLF_dead1A[44] / injectionSwitch.y, 1.0, 1.0);
                      }
                     else
                      if(int(donor_replacementGLF_dead1gl_FragCoord.x) < 180)
                       {
                        donor_replacementGLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1A[45] / injectionSwitch.x, donor_replacementGLF_dead1A[49] / injectionSwitch.y, 1.0, 1.0);
                       }
                      else
                       {
                        discard;
                       }
                   }
                if(_GLF_DEAD(false))
                 continue;
               }
              if(_GLF_DEAD(false))
               {
                _GLF_color = vec4(4.1, -461.353, 6.4, -4.2);
               }
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = min(unpackSnorm4x8(126285u), vec4(1.3, -49.27, 1026.3717, 7.0));
               if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           mat2x4(577.793, 7.9, 3.1, -17.30, -300.342, _GLF_IDENTITY(-6.3, clamp(-6.3, -6.3, _GLF_IDENTITY(-6.3, max(-6.3, -6.3)))), 15.91, -869.467);
          }
         if(false)
          {
           mat3x2(-2.9, -9429.1004, -3.6, -5.8, 4.5, -0.9);
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(831.192, -5521.8453, -917.216, -4904.5081);
            if(_GLF_WRAPPED_IF_TRUE(true))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           ivec3(-55207, 72405, -78194);
           ;
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(1.2, -3.9, 3.2, -2.7);
            if(_GLF_WRAPPED_IF_TRUE(true))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           ;
           uvec2(160446u, 150995u);
          }
         while((171.455 != ref))
          {
           if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
            {
             {
              continue;
              if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
               {
                _GLF_color = (-4.2 + mat2x4(-778.234, -8.1, -65.53, -1.8, -4.9, 9.0, 220.910, -6859.8718))[0];
               }
             }
            }
           mat3x4 _GLF_SWITCH_0_27v, _GLF_SWITCH_0_28v[19], _GLF_SWITCH_0_29v[28];
           uint _GLF_SWITCH_0_30v;
           uvec2(60380u, 159222u);
           mat4x3(2474.6729, 8.2, 53.14, -9.6, 6362.5539, _GLF_IDENTITY(-7.9, (_GLF_IDENTITY(-7.9, (-7.9) * 1.0)) - 0.0), 2.1, -16.54, -4.3, 205.416, -7.6, -3.1);
          }
         mat2x3(ref);
         mat4x3 _GLF_SWITCH_0_31v;
         discard;
         mat2 _GLF_SWITCH_0_32v;
         {
          vec4 _GLF_outVarBackup_GLF_color;
          {
           vec4 _GLF_outVarBackup_GLF_color;
           _GLF_outVarBackup_GLF_color = _GLF_color;
           _GLF_color = (vec4(96.82, -5.3, 0.7, -6.1) * 555.919);
           if(_GLF_WRAPPED_IF_TRUE(true))
            {
             _GLF_color = _GLF_outVarBackup_GLF_color;
            }
          }
          _GLF_outVarBackup_GLF_color = _GLF_color;
          _GLF_color = asinh((+ vec4(3503.2648, 951.796, -9.9, 1.9)));
          {
           vec4 _GLF_outVarBackup_GLF_color;
           _GLF_outVarBackup_GLF_color = _GLF_color;
           _GLF_color = (vec4(411.981, 1.2, 65.03, -6.9) / 9.8);
           if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
            {
             _GLF_color = _GLF_outVarBackup_GLF_color;
            }
          }
          if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
           {
            _GLF_color = _GLF_outVarBackup_GLF_color;
           }
         }
         if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
          {
           _GLF_color = max(vec4(-2419.8687, 278.405, -19.94, 2485.4164), step(107.816, vec4(-41.04, _GLF_IDENTITY(-6.7, clamp(-6.7, -6.7, -6.7)), 8.6, 9.5)));
          }
         {
          vec4 _GLF_outVarBackup_GLF_color;
          _GLF_outVarBackup_GLF_color = _GLF_color;
          _GLF_color = mat2x4(-38.92, 6.8, -745.269, -5.3, 654.695, -5.0, -8.0, 9822.8418)[0];
          if(_GLF_WRAPPED_IF_TRUE(true))
           {
            _GLF_color = _GLF_outVarBackup_GLF_color;
           }
         }
         ivec2(-15411, 10572);
        }
        {
         vec4 _GLF_outVarBackup_GLF_color;
         _GLF_outVarBackup_GLF_color = _GLF_color;
         _GLF_color = vec4(34.74, 56.76, -0.2, 12.90);
         if(_GLF_WRAPPED_IF_TRUE(true))
          {
           _GLF_color = _GLF_outVarBackup_GLF_color;
          }
        }
        if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0)))))
         return;
        ivec2(69873, -50478);
       }
       for(
           vec4 _GLF_SWITCH_0_33v, _GLF_SWITCH_0_34v, _GLF_SWITCH_0_35v;
           (bvec4(false, false, false, true) == lessThanEqual(ivec4(-90482, -72615, -17363, 39994), bitfieldInsert(ivec4(99025, 56828, -49602, -57785), ivec4(-12215, 29210, -71934, -67736), 11601, -96325)));
           _GLF_SWITCH_0_17v
       )
        {
         if(_GLF_DEAD(false))
          {
           vec2 donor_replacementGLF_dead2resolution = _GLF_FUZZED(uintBitsToFloat(uvec2(87142u, 198647u)));
           float donor_replacementGLF_dead2yCoord = _GLF_FUZZED(asin(ref));
           {
            float GLF_dead2height = donor_replacementGLF_dead2resolution.y;
            float GLF_dead2width = donor_replacementGLF_dead2resolution.x;
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = vec4(-82.35, 9643.5569, -360.436, -7.9);
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            float GLF_dead2c_re = 0.8 * (ref - GLF_dead2width / 2.0) * 4.0 / GLF_dead2width - 0.4;
            float GLF_dead2c_im = 0.8 * (donor_replacementGLF_dead2yCoord - GLF_dead2height / 2.0) * 4.0 / GLF_dead2width;
            float GLF_dead2x = 0.0, GLF_dead2y = 0.0;
            int GLF_dead2iteration = 0;
            for(
                int GLF_dead2k = 0;
                GLF_dead2k < 1000;
                GLF_dead2k ++
            )
             {
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = vec4(166.668, 669.526, -6034.1957, -6.3);
               if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
              if(GLF_dead2x * GLF_dead2x + GLF_dead2y * GLF_dead2y > 4.0)
               {
                break;
                if(_GLF_DEAD(false))
                 {
                  bool donor_replacementGLF_dead8c7 = _GLF_FUZZED(true);
                  vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(mat2x3(3.1, -954.580, 895.821, -624.426, 222.727, -6289.2367)[0]);
                  if(! donor_replacementGLF_dead8c7)
                   {
                    GLF_dead8computeColor(donor_replacementGLF_dead8setting.z / 40.0, donor_replacementGLF_dead2resolution);
                   }
                  {
                   vec4 _GLF_outVarBackup_GLF_color;
                   _GLF_outVarBackup_GLF_color = _GLF_color;
                   _GLF_color = (vec4(9332.7799, -2625.9006, 830.830, -7.5));
                   if(_GLF_WRAPPED_IF_TRUE(true))
                    {
                     _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                  }
                 }
               }
              if(_GLF_DEAD(false))
               return;
              float GLF_dead2x_new = GLF_dead2x * GLF_dead2x - GLF_dead2y * GLF_dead2y + GLF_dead2c_re;
              if(_GLF_DEAD(false))
               {
                _GLF_color = vec4(40.20, 710.892, 7.2, 20.88);
               }
              GLF_dead2y = 2.0 * GLF_dead2x * GLF_dead2y + GLF_dead2c_im;
              GLF_dead2x = GLF_dead2x_new;
              GLF_dead2iteration ++;
             }
            if(GLF_dead2iteration < 1000)
             {
              if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
               {
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = vec4(-0.0, -0.3, -9.3, 50.88);
                 if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x)))))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
                _GLF_color = vec4(-3.5, 6.0, -71.32, 61.09);
               }
              if(_GLF_DEAD(false))
               {
                bool donor_replacementGLF_dead8c3 = _GLF_FUZZED(false);
                if(! donor_replacementGLF_dead8c3)
                 {
                  GLF_dead8defaultColor();
                 }
               }
              GLF_dead2pickColor(GLF_dead2iteration);
             }
            else
             {
              vec3(_GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)));
             }
           }
          }
         {
          if(true)
           {
           }
          else
           {
            uvec4(170125u, 89634u, 196465u, 107117u);
            {
             vec4 _GLF_outVarBackup_GLF_color;
             if(_GLF_DEAD(false))
              {
               bool donor_replacementGLF_dead3c1 = _GLF_FUZZED(false);
               if(_GLF_DEAD(false))
                break;
               if(! donor_replacementGLF_dead3c1)
                {
                 GLF_dead3defaultColor();
                }
              }
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = vec4(-7807.4808, 7090.4209, 61.48, 13.12);
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (false ? _GLF_FUZZED(c) : _GLF_color = _GLF_outVarBackup_GLF_color));
               {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdy(vec4(-34.42, -52.07, -41.32, 36.49));
                if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
                 {
                  _GLF_color = _GLF_outVarBackup_GLF_color;
                 }
               }
              }
            }
            transpose(mat2(8196.7639, 991.020, -79.21, 890.587));
            ((39286 | -8809) * bitCount(ivec3(63530, 25633, -48352)));
            bool _GLF_SWITCH_0_36v, _GLF_SWITCH_0_37v[39];
            bvec3(false, false, true);
            if(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, vec2(_GLF_IDENTITY(injectionSwitch[0], (false ? _GLF_FUZZED(GLF_dead8h_r) : injectionSwitch[0])), injectionSwitch[1])).x > injectionSwitch.y))))
             {
              float donor_replacementGLF_dead3b_b = _GLF_FUZZED(degrees(vec3(-3005.4012, 4.7, 534.176)).s);
              float donor_replacementGLF_dead3c = _GLF_FUZZED(-5.4);
              vec2 donor_replacementGLF_dead3position = _GLF_FUZZED(step(resolution, injectionSwitch));
              if(_GLF_DEAD(false))
               return;
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = vec4(-94.03, 2.2, 8808.7160, -105.936);
               if(_GLF_WRAPPED_IF_TRUE(true))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
              float donor_replacementGLF_dead3s_g = _GLF_FUZZED(ref);
              if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
               {
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = vec4(-1.1, 1109.4177, 1.3, 69.80);
                 if(_GLF_WRAPPED_IF_TRUE(true))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
                return;
               }
              float donor_replacementGLF_dead3time = _GLF_FUZZED(distance(c, mix(_GLF_SWITCH_0_33v, (vec3(7.6, -5.3, -49.58) * mat4x3(-2746.3556, 780.371, -2.4, -5.8, -844.253, 3.1, 3.8, 9.0, 1.7, -4.5, 4634.2708, 9.3)), _GLF_SWITCH_0_34v)));
              {
               ref = fract(donor_replacementGLF_dead3c);
               donor_replacementGLF_dead3s_g = 1.0;
               donor_replacementGLF_dead3b_b = _GLF_IDENTITY((0.5 + (sin(donor_replacementGLF_dead3time) * 0.5 + 0.5)), clamp((0.5 + (sin(donor_replacementGLF_dead3time) * 0.5 + 0.5)), (0.5 + (sin(donor_replacementGLF_dead3time) * 0.5 + 0.5)), (0.5 + (sin(donor_replacementGLF_dead3time) * 0.5 + 0.5))));
               GLF_dead3doConvert();
               _GLF_IDENTITY(donor_replacementGLF_dead3s_g *= 1.0 / donor_replacementGLF_dead3position.y, (donor_replacementGLF_dead3s_g *= 1.0 / donor_replacementGLF_dead3position.y) - 0.0);
               ref *= 1.0 / donor_replacementGLF_dead3position.x;
               if(abs(donor_replacementGLF_dead3position.y - donor_replacementGLF_dead3position.x) < 0.5)
                {
                 _GLF_IDENTITY(donor_replacementGLF_dead3b_b = clamp(0.0, 1.0, donor_replacementGLF_dead3b_b * 3.0), (donor_replacementGLF_dead3b_b = clamp(0.0, 1.0, donor_replacementGLF_dead3b_b * 3.0)) + 0.0);
                }
               vec3(ref, donor_replacementGLF_dead3s_g, donor_replacementGLF_dead3b_b);
              }
             }
            mat4(_GLF_IDENTITY(-9.1, (true ? _GLF_IDENTITY(-9.1, clamp(-9.1, -9.1, _GLF_IDENTITY(-9.1, (true ? -9.1 : _GLF_FUZZED(ref))))) : _GLF_FUZZED(ref))), 142.518, -132.533, 93.74, 447.322, _GLF_IDENTITY(82.97, (_GLF_IDENTITY(82.97, clamp(82.97, _GLF_IDENTITY(82.97, max(82.97, 82.97)), 82.97))) * 1.0), 71.87, -27.61, 6.0, -139.712, 30.61, -2.3, 3.6, 0.9, 1708.6290, 9.1);
           }
          isnan(-946.161);
          if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
           {
            _GLF_color = vec4(-6680.7341, -6248.5111, 18.54, -37.38);
           }
          {
           vec4 _GLF_outVarBackup_GLF_color;
           _GLF_outVarBackup_GLF_color = _GLF_color;
           _GLF_color = vec4(2.8, 0.4, 829.351, -982.107);
           if(_GLF_WRAPPED_IF_TRUE(true))
            {
             _GLF_color = _GLF_outVarBackup_GLF_color;
            }
          }
         }
         ivec4 _GLF_SWITCH_0_38v, _GLF_SWITCH_0_39v, _GLF_SWITCH_0_40v;
         mat3x2 _GLF_SWITCH_0_41v[16], _GLF_SWITCH_0_42v[47];
         {
          {
           vec4 _GLF_outVarBackup_GLF_color;
           _GLF_outVarBackup_GLF_color = _GLF_color;
           _GLF_color = vec4(75.24, -17.47, 626.512, -1.1);
           if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
            {
             _GLF_color = _GLF_outVarBackup_GLF_color;
            }
          }
          mat2x3 _GLF_SWITCH_0_43v[17], _GLF_SWITCH_0_44v, _GLF_SWITCH_0_45v[8];
          if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
           break;
          {
           lessThanEqual(uvec4(171095u, 164100u, 85912u, 136021u), uvec4(184257u, 52085u, 32000u, 61533u));
           if(_GLF_DEAD(false))
            {
             {
              vec4 _GLF_outVarBackup_GLF_color;
              _GLF_outVarBackup_GLF_color = _GLF_color;
              _GLF_color = refract(vec4(74.00, 5387.7157, -24.23, 9.1), vec4(-8.6, -6391.9172, -7.5, -8.4), normalize(5.5));
              if(_GLF_WRAPPED_IF_TRUE(true))
               {
                _GLF_color = _GLF_outVarBackup_GLF_color;
               }
             }
             {
              if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
               {
                _GLF_color = round(exp(vec4(4.4, 585.323, 521.987, 0.0)));
               }
              GLF_dead3defaultColor();
             }
            }
           bvec3(false, false, false);
          }
         }
         {
          float _GLF_SWITCH_0_46v[41], _GLF_SWITCH_0_47v, _GLF_SWITCH_0_48v;
          {
           if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
            {
             _GLF_color = (vec4(7570.6567, 2024.4379, 21.73, 16.23) - vec4(535.477, _GLF_IDENTITY(-515.710, mix(float(-515.710), float(_GLF_FUZZED(4.9)), bool(false))), -3.6, 73.25));
            }
           vec4 _GLF_outVarBackup_GLF_color;
           _GLF_outVarBackup_GLF_color = _GLF_color;
           _GLF_color = uintBitsToFloat(uvec4(34958u, 109702u, 34107u, 43191u));
           if(_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true))))
            {
             _GLF_color = _GLF_outVarBackup_GLF_color;
            }
          }
          for(
              mat3(7.7, 13.73, 271.187, 318.809, _GLF_IDENTITY(-2.4, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(GLF_dead3time) : -2.4)), -323.479, -5.6, -0.7, -4.3);
              bvec2(false, false)[1];
              mat4x2(-3.2, -2.1, 7985.2040, -9.0, -804.070, 3307.6679, -4.4, -8.6)
          )
           {
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = vec4(1323.5731, 2.5, -7443.7591, -5445.4666);
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            ;
            if(_GLF_DEAD(false))
             {
              _GLF_color = step(2.1, vec4(6.7, -289.624, 1.8, -864.537));
             }
            bvec4(false, true, true, true);
            mat2x4(mat4(mat2x3(_GLF_IDENTITY(-4.5, clamp(_GLF_IDENTITY(-4.5, (-4.5) - 0.0), _GLF_IDENTITY(-4.5, clamp(-4.5, _GLF_IDENTITY(-4.5, min(-4.5, -4.5)), -4.5)), -4.5)), -4111.3853, 7244.4205, 380.001, -3821.6820, 2.9)));
            bvec4(true, false, true, true);
            bvec3 _GLF_SWITCH_0_49v;
            vec3 _GLF_SWITCH_0_50v;
            bvec2(true, true);
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = (mat2x4(7623.1725, 2.6, 3512.0316, 9.1, 54.19, 11.64, 78.74, -15.61) * vec2(80.67, 9821.3859));
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            ivec2 _GLF_SWITCH_0_51v, _GLF_SWITCH_0_52v, _GLF_SWITCH_0_53v;
           }
          (_GLF_SWITCH_0_14v | uvec4(70145u, 191509u, 146824u, 147674u));
          ;
          mat4x3(-0.8, 5676.3033, -793.797, 8.5, -61.85, 9.4, -117.264, -2.1, -2.1, 7486.3150, 8313.8621, 49.78);
          matrixCompMult(mat4x3(1.3, -3.2, -2.0, -3394.1516, -378.943, -4.6, -65.82, -2.8, -40.22, 4.0, -9.8, 6.6), mat4x3(-4.4, 89.50, 3.9, -68.24, 37.15, 9.9, 247.263, 0.8, _GLF_IDENTITY(1006.3621, (1006.3621) / 1.0), -433.514, 8526.6623, _GLF_IDENTITY(8.5, 1.0 * (8.5))));
          {
           vec4 _GLF_outVarBackup_GLF_color;
           _GLF_outVarBackup_GLF_color = _GLF_color;
           _GLF_color = mat2x4(-4180.4970, -59.25, 7755.6391, -25.54, -4089.8797, 23.46, -1.3, 44.44)[1];
           if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
            {
             _GLF_color = _GLF_outVarBackup_GLF_color;
            }
          }
          while((ivec2(3753, -78028) == ivec2(-39796, 58872)))
           {
            if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
             discard;
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = vec4(-94.61, -4.1, 79.94, -1.4);
             if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            mat3 _GLF_SWITCH_0_54v;
            uvec4 _GLF_SWITCH_0_55v[71], _GLF_SWITCH_0_56v;
            mat3x4(378.698, -5925.4206, 9894.9026, -40.19, 6.9, 3.7, 4961.6810, 166.823, -0.5, 9556.4593, -15.76, _GLF_IDENTITY(-5545.7733, mix(float(_GLF_FUZZED(1.1)), float(-5545.7733), bool(true))));
            float _GLF_SWITCH_0_57v[16], _GLF_SWITCH_0_58v;
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = vec4(2.6, 5.5, -27.15, 543.231);
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            injectionSwitch;
            bvec3(false, _GLF_IDENTITY(false, ! (_GLF_IDENTITY(! (false), (! (false)) && true))), false);
           }
          {
           vec4 _GLF_outVarBackup_GLF_color;
           _GLF_outVarBackup_GLF_color = _GLF_color;
           _GLF_color = vec4(-8339.5489, -1.1, -54.78, 8.2);
           if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0))))))
            {
             _GLF_color = _GLF_outVarBackup_GLF_color;
            }
          }
         }
         for(
             _GLF_SWITCH_0_17v;
             true;
             bvec3(false, false, true)
         )
          {
           if(_GLF_DEAD(false))
            {
             _GLF_color = vec4(-9.3, -0.6, -8349.1454, -599.442);
            }
           int _GLF_SWITCH_0_59v[56], _GLF_SWITCH_0_60v[56], _GLF_SWITCH_0_61v;
           (_GLF_SWITCH_0_35v * mat3x4(-324.571, 278.469, -556.419, 7.8, 2.6, -2.3, 0.7, 2753.3996, -915.796, 9.2, -5.5, 0.2));
           while(true)
            {
             vec4 _GLF_SWITCH_0_62v[68], _GLF_SWITCH_0_63v[48], _GLF_SWITCH_0_64v;
             {
              vec4 _GLF_outVarBackup_GLF_color;
              _GLF_outVarBackup_GLF_color = _GLF_color;
              _GLF_color = vec4(531.989, -1091.1589, 7.2, _GLF_IDENTITY(860.945, max(860.945, 860.945)));
              if(_GLF_WRAPPED_IF_TRUE(true))
               {
                _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mix(vec4((_GLF_outVarBackup_GLF_color)[0], _GLF_FUZZED(-6.5), (_GLF_outVarBackup_GLF_color)[2], _GLF_FUZZED(79.23)), vec4(_GLF_FUZZED(5.1), _GLF_IDENTITY((_GLF_outVarBackup_GLF_color)[1], ((_GLF_outVarBackup_GLF_color)[1]) + 0.0), _GLF_FUZZED(-2.4), (_GLF_outVarBackup_GLF_color)[3]), bvec4(false, true, false, true)));
                if(_GLF_DEAD(false))
                 {
                  vec2 donor_replacementGLF_dead5resolution = _GLF_FUZZED(roundEven(GLF_dead2resolution));
                  float donor_replacementGLF_dead5xCoord = _GLF_FUZZED(ref);
                  {
                   {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-924.357, 5318.6087, 7804.2203, -259.508);
                    if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0)))))
                     {
                      _GLF_color = _GLF_outVarBackup_GLF_color;
                     }
                   }
                   float GLF_dead5height = donor_replacementGLF_dead5resolution.y;
                   float GLF_dead5width = donor_replacementGLF_dead5resolution.x;
                   if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
                    {
                     _GLF_color = atan(vec4(2145.3032, -4668.7255, 6.0, 9917.1283), vec4(6792.9744, -4.4, -9.6, -9.8));
                    }
                   float GLF_dead5c_re = 0.8 * (donor_replacementGLF_dead5xCoord - GLF_dead5width / 2.0) * 4.0 / GLF_dead5width - 0.4;
                   float GLF_dead5c_im = 0.8 * (GLF_dead3h_r - GLF_dead5height / 2.0) * 4.0 / GLF_dead5width;
                   float GLF_dead5x = 0.0, GLF_dead5y = 0.0;
                   int GLF_dead5iteration = 0;
                   for(
                       int GLF_dead5k = 0;
                       GLF_dead5k < 1000;
                       GLF_dead5k ++
                   )
                    {
                     if(_GLF_IDENTITY(GLF_dead5x * GLF_dead5x + GLF_dead5y * GLF_dead5y, mix(float(_GLF_FUZZED(71.74)), float(GLF_dead5x * GLF_dead5x + GLF_dead5y * GLF_dead5y), bool(true))) > 4.0)
                      {
                       break;
                      }
                     float GLF_dead5x_new = GLF_dead5x * GLF_dead5x - GLF_dead5y * GLF_dead5y + GLF_dead5c_re;
                     GLF_dead5y = 2.0 * GLF_dead5x * GLF_dead5y + GLF_dead5c_im;
                     GLF_dead5x = GLF_dead5x_new;
                     GLF_dead5iteration ++;
                    }
                   if(GLF_dead5iteration < 1000)
                    {
                     GLF_dead5pickColor(GLF_dead5iteration);
                    }
                   else
                    {
                     vec3(0.0);
                    }
                  }
                 }
               }
             }
             ivec2 _GLF_SWITCH_0_65v;
             ivec4(_GLF_SWITCH_0_61v);
             {
              vec4 _GLF_outVarBackup_GLF_color;
              _GLF_outVarBackup_GLF_color = _GLF_color;
              if(_GLF_DEAD(false))
               {
                bool donor_replacementGLF_dead3c3 = _GLF_FUZZED(false);
                if(! donor_replacementGLF_dead3c3)
                 {
                  GLF_dead3defaultColor();
                 }
                if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
                 {
                  _GLF_color = vec4(-8184.2939, -1.5, 744.651, -89.36);
                 }
               }
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = vec4(-42.85, -74.62, -916.398, -59.46);
               if(_GLF_WRAPPED_IF_TRUE(true))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
              _GLF_color = asinh(vec4(8.7, -443.640, _GLF_IDENTITY(11.06, clamp(_GLF_IDENTITY(11.06, (11.06) / 1.0), 11.06, 11.06)), -96.27));
              if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0)))))
               {
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = step(-1.5, (mat4(-7.0, -703.228, -813.959, 6.9, 6.4, 487.051, 0.6, -1.0, -4.7, 6.8, 2811.7275, -111.456, -8936.2435, 2.8, 356.572, 68.58) * vec4(-485.147, 3.5, -2.3, 477.622)));
                 if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
                if(_GLF_DEAD(false))
                 {
                  _GLF_color = vec4(90.83, 3.9, 936.003, -4419.4107);
                 }
                bool donor_replacementGLF_dead8c6 = _GLF_FUZZED(true);
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = vec4(-7728.3531, 11.03, -0.2, -7626.3127);
                 if(_GLF_WRAPPED_IF_TRUE(true))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
                vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(exp(GLF_dead2resolution));
                if(_GLF_DEAD(false))
                 {
                  {
                   vec4 _GLF_outVarBackup_GLF_color;
                   _GLF_outVarBackup_GLF_color = _GLF_color;
                   _GLF_color = vec4(24.54, 56.66, -0.9, -7.5);
                   if(_GLF_WRAPPED_IF_TRUE(true))
                    {
                     _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                  }
                  discard;
                 }
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = radians(vec4(-19.89, -3.1, -409.984, 802.335));
                 if(_GLF_WRAPPED_IF_TRUE(true))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
                vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED((GLF_dead3h_r * exp(vec3(4.5, -23.55, 94.73))));
                if(! donor_replacementGLF_dead8c6)
                 {
                  GLF_dead8computeColor(donor_replacementGLF_dead8setting.z / 40.0, donor_replacementGLF_dead8pos);
                 }
               }
              if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
               {
                _GLF_color = _GLF_outVarBackup_GLF_color;
               }
             }
            }
           ;
           while(true)
            {
             if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
              {
               if(_GLF_DEAD(false))
                {
                 bool donor_replacementGLF_dead8c5 = _GLF_FUZZED(false);
                 vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(tanh(normalize(GLF_dead4resolution)));
                 vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(vec3(-8384.9089, -7796.7664, -5.5));
                 if(! donor_replacementGLF_dead8c5)
                  {
                   _GLF_IDENTITY(GLF_dead8computeColor(donor_replacementGLF_dead8setting.z / 40.0, donor_replacementGLF_dead8pos), (GLF_dead8computeColor(donor_replacementGLF_dead8setting.z / 40.0, donor_replacementGLF_dead8pos)) - vec3(0.0, 0.0, 0.0));
                  }
                }
               _GLF_color = vec4(66.48, 746.629, -5467.1781, -14.14);
              }
            }
           mat3x2 _GLF_SWITCH_0_66v[31], _GLF_SWITCH_0_67v[33];
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = vec4(1.3, -632.405, 26.35, -3147.7831);
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
             {
              _GLF_color = vec4(3.3, 1368.8983, -301.861, -4.1);
             }
            _GLF_color = vec4(-8.5, 916.088, -11.92, 7.6);
            {
             vec4 _GLF_outVarBackup_GLF_color;
             _GLF_outVarBackup_GLF_color = _GLF_color;
             _GLF_color = mat2x4(-4.9, -6.7, 1436.9347, 81.52, 5.9, 30.95, -44.05, 608.635)[0];
             if(_GLF_WRAPPED_IF_TRUE(true))
              {
               _GLF_color = _GLF_outVarBackup_GLF_color;
              }
            }
            if(_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && _GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch)).x < injectionSwitch.y)))))
             {
              switch(_GLF_SWITCH(0))
               {
                case 41:
                min(uvec2(44761u, 158181u), uvec2(159433u, 74389u));
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = vec4(-98.24, -0.6, -596.393, -6118.7569);
                 if(_GLF_WRAPPED_IF_TRUE(true))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
                case 0:
                case 97:
                case 55:
                if(_GLF_DEAD(false))
                 {
                  vec4 donor_replacementGLF_dead7_GLF_color = _GLF_FUZZED(_GLF_SWITCH_0_33v);
                  float donor_replacementGLF_dead7data[10];
                  {
                   donor_replacementGLF_dead7_GLF_color = vec4(donor_replacementGLF_dead7data[0] / 10.0, donor_replacementGLF_dead7data[5] / 10.0, donor_replacementGLF_dead7data[9] / 10.0, 1.0);
                  }
                  if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0)))))
                   {
                    _GLF_color = mix(vec4(8.1, -6.7, -8.5, -4.8), vec4(3.5, -5.8, -8.3, -5311.6018), greaterThan(vec4(6770.6901, 175.005, -6195.4639, 6.3), vec4(3.0, -6.3, -2.3, -847.750)));
                   }
                 }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                break;
                if(_GLF_DEAD(false))
                 {
                  if(_GLF_DEAD(false))
                   {
                    {
                     vec4 _GLF_outVarBackup_GLF_color;
                     _GLF_outVarBackup_GLF_color = _GLF_color;
                     _GLF_color = sqrt(vec4(-3.7, 8.7, 33.37, 4.2));
                     if(_GLF_WRAPPED_IF_TRUE(true))
                      {
                       _GLF_color = _GLF_outVarBackup_GLF_color;
                      }
                    }
                    _GLF_color = vec2(4.6, 55.21).xyyy;
                   }
                  {
                   GLF_dead8defaultColor();
                  }
                  if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
                   {
                    _GLF_color = trunc(vec4(52.67, -6219.2626, -8.3, -75.89).wyyw);
                   }
                 }
                case 29:
                uvec3(184390u, 67568u, 151608u);
                default:
                1;
                if(_GLF_DEAD(false))
                 {
                  if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
                   {
                    _GLF_color = vec4(-31.33, -9.1, -6815.9254, 7.2);
                   }
                  discard;
                 }
               }
             }
           }
           ;
           if(_GLF_DEAD(false))
            return;
          }
        }
       if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
        return;
       discard;
       {
        _GLF_SWITCH_0_14v;
        for(
            greaterThanEqual(uvec2(342u, 27253u), uvec2(5344u, 100280u));
            true;
            bvec4(true, true, false, true)
        )
         {
          while((uvec4(135803u, 193179u, 50275u, 42217u) != uvec4(34270u, 33048u, 11131u, 45609u)))
           {
            switch(_GLF_SWITCH(0))
             {
              case 25:
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = vec4(375.520);
               if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
              bvec2(false, false);
              case 0:
              int _GLF_SWITCH_0_68v, _GLF_SWITCH_0_69v;
              case 3:
              int _GLF_SWITCH_0_70v, _GLF_SWITCH_0_71v;
              (_GLF_IDENTITY(4.3 / mat2(-34.32, -85.29, 84.99, 175.576), (true ? 4.3 / _GLF_IDENTITY(mat2(-34.32, _GLF_IDENTITY(-85.29, mix(float(_GLF_IDENTITY(-85.29, (-85.29) / _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))))), float(_GLF_FUZZED((-452.192 - -690.706))), _GLF_IDENTITY(bool(false), ! (! (bool(false)))))), 84.99, 175.576), transpose(transpose(mat2(-34.32, _GLF_IDENTITY(-85.29, mix(float(_GLF_IDENTITY(-85.29, (-85.29) / _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))))), float(_GLF_FUZZED((-452.192 - -690.706))), bool(false))), 84.99, 175.576)))) : _GLF_FUZZED(mat2(852.481, 507.430, -516.398, -8.5)))));
              uvec3(_GLF_SWITCH_0_12v, uvec2(_GLF_IDENTITY(103261u, ~ (~ (103261u))), 75406u));
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = vec4(-6227.1086, -6.1, 7050.3926, 5.4);
               if(_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true)))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
              break;
              case 22:
              vec2(9.5, 3991.3485);
              {
               vec4 _GLF_outVarBackup_GLF_color;
               _GLF_outVarBackup_GLF_color = _GLF_color;
               _GLF_color = vec4(-2905.6199, -2.0, -569.567, -306.849);
               if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
                {
                 _GLF_color = _GLF_outVarBackup_GLF_color;
                }
              }
              if(_GLF_DEAD(false))
               {
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = vec4(-5673.9656, -9552.0912, 31.08, -28.95);
                 if(_GLF_WRAPPED_IF_TRUE(true))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
                break;
               }
              case 23:
              if(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, (false ? _GLF_FUZZED(GLF_dead3b_b) : gl_FragCoord.y)) < abs(0.0)))))
               {
                {
                 continue;
                }
               }
              ivec3(-31158, 92367, -34895);
              if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
               discard;
              default:
              if(_GLF_DEAD(false))
               continue;
              if(_GLF_DEAD(false))
               discard;
              1;
             }
            if(_GLF_DEAD(false))
             {
              float donor_replacementGLF_dead4data[10];
              for(
                  int GLF_dead4i = 0;
                  GLF_dead4i < 9;
                  GLF_dead4i ++
              )
               {
                for(
                    int GLF_dead4j = 0;
                    GLF_dead4j < 10;
                    GLF_dead4j ++
                )
                 {
                  {
                   vec4 _GLF_outVarBackup_GLF_color;
                   _GLF_outVarBackup_GLF_color = _GLF_color;
                   _GLF_color = vec4(0.7, 3.9, -4.8, 9.4);
                   if(_GLF_WRAPPED_IF_TRUE(true))
                    {
                     _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                  }
                  if(GLF_dead4j < GLF_dead4i + 1)
                   {
                    continue;
                   }
                  bool GLF_dead4doSwap = GLF_dead4checkSwap(donor_replacementGLF_dead4data[(GLF_dead4i) >= _GLF_IDENTITY(0, (0) ^ (0 | 0)) && (GLF_dead4i) < 10 ? GLF_dead4i : 0], donor_replacementGLF_dead4data[(GLF_dead4j) >= 0 && (GLF_dead4j) < 10 ? GLF_dead4j : 0]);
                  if(GLF_dead4doSwap)
                   {
                    float GLF_dead4temp = donor_replacementGLF_dead4data[(GLF_dead4i) >= 0 && (GLF_dead4i) < 10 ? GLF_dead4i : 0];
                    donor_replacementGLF_dead4data[(GLF_dead4i) >= 0 && (GLF_dead4i) < 10 ? GLF_dead4i : 0] = donor_replacementGLF_dead4data[(GLF_dead4j) >= 0 && (GLF_dead4j) < 10 ? GLF_dead4j : 0];
                    donor_replacementGLF_dead4data[(GLF_dead4j) >= 0 && (GLF_dead4j) < 10 ? GLF_dead4j : 0] = GLF_dead4temp;
                   }
                 }
               }
             }
           }
          for(
              (251.243 + mat2x3(968.975, -7431.4326, -815.156, -1.2, 346.858, -98.92));
              true;
              bvec2(true, false)
          )
           {
            if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
             break;
            equal(ivec3(-98531, -19306, 64888).gb, ivec2(15835, 36199));
            vec4 _GLF_SWITCH_0_72v, _GLF_SWITCH_0_73v, _GLF_SWITCH_0_74v[88];
            floatBitsToUint(vec3(-1772.7745, 10.51, 4333.8988));
            mat3x2(223.932, 2262.7926, 450.279, -586.655, 5.0, 8236.1637);
           }
          bvec2(false);
          {
          }
         }
        {
         vec4 _GLF_outVarBackup_GLF_color;
         _GLF_outVarBackup_GLF_color = _GLF_color;
         if(_GLF_DEAD(false))
          {
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-0.7, 2.9, -67.37, 6.8);
            if(_GLF_WRAPPED_IF_TRUE(true))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           vec3 donor_replacementGLF_dead2data[16];
           mediump vec4 donor_replacementGLF_dead2gl_FragCoord = _GLF_FUZZED(sin(_GLF_outVarBackup_GLF_color));
           if(_GLF_DEAD(false))
            {
             _GLF_color = fract(vec4(-498.596, 1360.9823, -94.86, 63.76));
            }
           int donor_replacementGLF_dead2i = _GLF_FUZZED((i & i));
           {
            donor_replacementGLF_dead2data[(4 * i + donor_replacementGLF_dead2i) >= 0 && (4 * i + donor_replacementGLF_dead2i) < 16 ? 4 * i + donor_replacementGLF_dead2i : 0] = GLF_dead2mand(donor_replacementGLF_dead2gl_FragCoord.x + float(donor_replacementGLF_dead2i - 1), donor_replacementGLF_dead2gl_FragCoord.y + float(i - 1));
           }
          }
         _GLF_color = vec4(-912.000, 471.761, -977.943, 5153.8910);
         if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
          {
           _GLF_color = _GLF_outVarBackup_GLF_color;
          }
        }
        if(_GLF_DEAD(false))
         {
          vec4 donor_replacementGLF_dead4_GLF_color = _GLF_FUZZED(min(intBitsToFloat(ivec4(-13370, -30515, -61394, -41614)), 199.216));
          {
           vec4 _GLF_outVarBackup_GLF_color;
           _GLF_outVarBackup_GLF_color = _GLF_color;
           _GLF_color = reflect(vec4(1.4, -88.00, -2.8, -32.64), vec4(-9.8, 234.869, 383.348, 91.64));
           if(_GLF_WRAPPED_IF_TRUE(true))
            {
             _GLF_color = _GLF_outVarBackup_GLF_color;
            }
          }
          mediump vec4 donor_replacementGLF_dead4gl_FragCoord = _GLF_FUZZED(_GLF_SWITCH_0_16v);
          vec2 donor_replacementGLF_dead4injectionSwitch = _GLF_FUZZED(log2(vec2(-0.7, 8.2)));
          vec2 donor_replacementGLF_dead4resolution = _GLF_FUZZED(resolution);
          {
           float GLF_dead4data[10];
           if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
            break;
           for(
               int GLF_dead4i = 0;
               GLF_dead4i < 10;
               GLF_dead4i ++
           )
            {
             GLF_dead4data[(GLF_dead4i) >= 0 && (GLF_dead4i) < 10 ? GLF_dead4i : 0] = float(10 - GLF_dead4i) * donor_replacementGLF_dead4injectionSwitch.y;
            }
           for(
               int GLF_dead4i = 0;
               GLF_dead4i < 9;
               GLF_dead4i ++
           )
            {
             for(
                 int GLF_dead4j = 0;
                 GLF_dead4j < 10;
                 GLF_dead4j ++
             )
              {
               {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(4469.3520, -535.434, -41.31, -12.33).brbb;
                if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(vec2(0.0, 0.0))))))
                 {
                  _GLF_color = _GLF_outVarBackup_GLF_color;
                 }
               }
               if(GLF_dead4j < GLF_dead4i + 1)
                {
                 continue;
                }
               bool GLF_dead4doSwap = GLF_dead4checkSwap(GLF_dead4data[(GLF_dead4i) >= 0 && (GLF_dead4i) < 10 ? GLF_dead4i : 0], GLF_dead4data[(GLF_dead4j) >= 0 && (GLF_dead4j) < 10 ? GLF_dead4j : 0]);
               if(GLF_dead4doSwap)
                {
                 float GLF_dead4temp = GLF_dead4data[(GLF_dead4i) >= 0 && (GLF_dead4i) < 10 ? GLF_dead4i : 0];
                 if(_GLF_DEAD(false))
                  {
                   _GLF_color = asin(tanh(vec4(0.2, 7932.5507, -76.04, 36.57)));
                  }
                 GLF_dead4data[(GLF_dead4i) >= 0 && (GLF_dead4i) < 10 ? GLF_dead4i : 0] = GLF_dead4data[(GLF_dead4j) >= 0 && (GLF_dead4j) < 10 ? GLF_dead4j : 0];
                 GLF_dead4data[(GLF_dead4j) >= 0 && (GLF_dead4j) < 10 ? GLF_dead4j : 0] = GLF_dead4temp;
                }
              }
            }
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(44.82, 7.0, -9.6, 8170.8982);
            if(_GLF_WRAPPED_IF_TRUE(true))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           if(donor_replacementGLF_dead4gl_FragCoord.x < donor_replacementGLF_dead4resolution.x / 2.0)
            {
             if(_GLF_DEAD(false))
              continue;
             donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4data[0] / 10.0, GLF_dead4data[5] / 10.0, GLF_dead4data[9] / 10.0, 1.0);
            }
           else
            {
             donor_replacementGLF_dead4_GLF_color = vec4(GLF_dead4data[5] / 10.0, GLF_dead4data[9] / 10.0, GLF_dead4data[0] / 10.0, 1.0);
             if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
              {
               vec3 donor_replacementGLF_dead5data[16];
               {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-76.51, 5405.5599, 7739.8272, 50.42);
                if(_GLF_WRAPPED_IF_TRUE(true))
                 {
                  _GLF_color = _GLF_outVarBackup_GLF_color;
                 }
               }
               mediump vec4 donor_replacementGLF_dead5gl_FragCoord = _GLF_FUZZED(trunc(donor_replacementGLF_dead4gl_FragCoord));
               for(
                   int GLF_dead5j = 0;
                   GLF_dead5j < 4;
                   GLF_dead5j ++
               )
                {
                 donor_replacementGLF_dead5data[(4 * GLF_dead5j + i) >= 0 && (4 * GLF_dead5j + i) < 16 ? 4 * GLF_dead5j + i : 0] = GLF_dead5mand(donor_replacementGLF_dead5gl_FragCoord.x + float(i - 1), donor_replacementGLF_dead5gl_FragCoord.y + float(GLF_dead5j - 1));
                }
              }
            }
           {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(-7.7, -69.84, 563.580, 163.151) + vec4(-90.93, -6.6, -44.54, 4.9));
            if(_GLF_WRAPPED_IF_TRUE(true))
             {
              _GLF_color = _GLF_outVarBackup_GLF_color;
             }
           }
           if(_GLF_DEAD(false))
            {
             if(_GLF_DEAD(false))
              {
               _GLF_color = step((+ 7.8), vec4(acos(vec3(8468.0649, 7632.2380, 95.53)), -5.3));
              }
             float donor_replacementGLF_dead6A[50];
             vec4 donor_replacementGLF_dead6_GLF_color = _GLF_FUZZED(_GLF_color.pqst);
             vec2 donor_replacementGLF_dead6resolution = _GLF_FUZZED(radians(exp2(GLF_dead4resolution)));
             {
              donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[15] / donor_replacementGLF_dead6resolution.x, donor_replacementGLF_dead6A[_GLF_IDENTITY(19, min(19, 19))] / donor_replacementGLF_dead6resolution.y, 1.0, 1.0);
             }
            }
          }
         }
        {
         vec4 _GLF_outVarBackup_GLF_color;
         _GLF_outVarBackup_GLF_color = _GLF_color;
         _GLF_color = vec4(26.28, 9.4, -5307.7535, 8.9);
         if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
          {
           _GLF_color = _GLF_outVarBackup_GLF_color;
          }
        }
       }
       if(_GLF_DEAD(false))
        {
         _GLF_color = _GLF_IDENTITY(dFdy(inversesqrt(vec4(11.19, -7.8, 51.29, -8.3))), min(_GLF_IDENTITY(dFdy(inversesqrt(vec4(11.19, -7.8, 51.29, -8.3))), clamp(dFdy(inversesqrt(vec4(11.19, -7.8, 51.29, -8.3))), dFdy(inversesqrt(vec4(11.19, -7.8, 51.29, -8.3))), _GLF_IDENTITY(dFdy(inversesqrt(vec4(11.19, -7.8, 51.29, -8.3))), (dFdy(inversesqrt(vec4(11.19, -7.8, 51.29, -8.3)))) * vec4(1.0, 1.0, 1.0, 1.0)))), _GLF_IDENTITY(dFdy(inversesqrt(vec4(11.19, -7.8, 51.29, -8.3))), max(dFdy(inversesqrt(vec4(11.19, -7.8, 51.29, -8.3))), dFdy(inversesqrt(vec4(11.19, -7.8, 51.29, -8.3)))))));
         if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
          {
           float donor_replacementGLF_dead6A[50];
           vec4 donor_replacementGLF_dead6_GLF_color = _GLF_FUZZED(vec4(ref, vec3(5.5, -294.927, 6262.0345)));
           if(int(GLF_dead4gl_FragCoord.x) < 80)
            {
             donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[15] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[19] / GLF_dead4resolution.y, 1.0, 1.0);
            }
           else
            {
             if(_GLF_DEAD(false))
              return;
             if(int(GLF_dead4gl_FragCoord.x) < 100)
              {
               donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[20] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[24] / GLF_dead4resolution.y, 1.0, 1.0);
               {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5.7, -0.1, -1162.3200, 3.2);
                if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0)))))
                 {
                  _GLF_color = _GLF_outVarBackup_GLF_color;
                 }
               }
              }
             else
              if(_GLF_IDENTITY(int(GLF_dead4gl_FragCoord.x), (int(GLF_dead4gl_FragCoord.x)) << 0) < 120)
               {
                _GLF_IDENTITY(donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(pow(_GLF_SWITCH_0_15v, c)) : donor_replacementGLF_dead6_GLF_color = _GLF_IDENTITY(vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0), clamp(vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0), _GLF_IDENTITY(vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0), clamp(vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0), vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0), _GLF_IDENTITY(vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0), max(vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0), vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0))))), vec4(donor_replacementGLF_dead6A[25] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[29] / GLF_dead4resolution.y, 1.0, 1.0)))));
               }
              else
               {
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = vec4(5.4, 1730.6417, -0.5, -2.0);
                 if(_GLF_WRAPPED_IF_TRUE(true))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
                if(int(GLF_dead4gl_FragCoord.x) < 140)
                 {
                  donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[30] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[34] / GLF_dead4resolution.y, 1.0, 1.0);
                 }
                else
                 if(int(GLF_dead4gl_FragCoord.x) < 160)
                  {
                   donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[35] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[39] / GLF_dead4resolution.y, 1.0, 1.0);
                  }
                 else
                  if(int(GLF_dead4gl_FragCoord.x) < 180)
                   {
                    donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[40] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[44] / GLF_dead4resolution.y, 1.0, 1.0);
                    {
                     vec4 _GLF_outVarBackup_GLF_color;
                     _GLF_outVarBackup_GLF_color = _GLF_color;
                     _GLF_color = vec4(9.7, -970.025, -504.735, 30.67);
                     if(_GLF_WRAPPED_IF_TRUE(true))
                      {
                       _GLF_color = _GLF_outVarBackup_GLF_color;
                      }
                    }
                   }
                  else
                   if(int(GLF_dead4gl_FragCoord.x) < 180)
                    {
                     donor_replacementGLF_dead6_GLF_color = vec4(donor_replacementGLF_dead6A[45] / GLF_dead4resolution.x, donor_replacementGLF_dead6A[49] / GLF_dead4resolution.y, 1.0, 1.0);
                    }
                   else
                    {
                     discard;
                    }
               }
            }
          }
        }
       {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))
         {
          _GLF_color = abs(vec4(-33.44, 96.05, -3.0, -794.888));
         }
        if(_GLF_DEAD(false))
         {
          _GLF_color = vec4(2114.5931, 8.8, 3026.9980, 597.481);
         }
        if(_GLF_DEAD(false))
         {
          bool donor_replacementGLF_dead8c3 = _GLF_FUZZED((352 < ivec4(54670, 99125, 22689, -34026)[3]));
          if(! donor_replacementGLF_dead8c3)
           {
            GLF_dead8defaultColor();
           }
         }
        _GLF_color = vec4(-166.502, _GLF_IDENTITY(-58.69, max(-58.69, -58.69)), -3.1, -98.78);
        if(_GLF_WRAPPED_IF_TRUE(true))
         {
          if(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))
           {
            float donor_replacementGLF_dead7data[10];
            for(
                int GLF_dead7i = 0;
                GLF_dead7i < 9;
                GLF_dead7i ++
            )
             {
              for(
                  int GLF_dead7j = 0;
                  GLF_dead7j < 10;
                  GLF_dead7j ++
              )
               {
                if(GLF_dead7j < GLF_dead7i + 1)
                 {
                  continue;
                 }
                bool GLF_dead7doSwap = GLF_dead7checkSwap(donor_replacementGLF_dead7data[(GLF_dead7i) >= 0 && (GLF_dead7i) < 10 ? GLF_dead7i : 0], donor_replacementGLF_dead7data[(GLF_dead7j) >= 0 && (GLF_dead7j) < 10 ? GLF_dead7j : 0]);
                if(GLF_dead7doSwap)
                 {
                  float GLF_dead7temp = donor_replacementGLF_dead7data[(GLF_dead7i) >= 0 && (GLF_dead7i) < 10 ? GLF_dead7i : 0];
                  donor_replacementGLF_dead7data[(GLF_dead7i) >= 0 && (GLF_dead7i) < 10 ? GLF_dead7i : 0] = donor_replacementGLF_dead7data[(GLF_dead7j) >= 0 && (GLF_dead7j) < 10 ? GLF_dead7j : 0];
                  donor_replacementGLF_dead7data[(GLF_dead7j) >= 0 && (GLF_dead7j) < 10 ? GLF_dead7j : 0] = GLF_dead7temp;
                 }
                {
                 vec4 _GLF_outVarBackup_GLF_color;
                 _GLF_outVarBackup_GLF_color = _GLF_color;
                 _GLF_color = (9.0 * vec4(0.5, -14.68, 4700.6490, -391.035));
                 if(_GLF_WRAPPED_IF_TRUE(true))
                  {
                   _GLF_color = _GLF_outVarBackup_GLF_color;
                  }
                }
               }
             }
           }
          _GLF_color = _GLF_outVarBackup_GLF_color;
         }
       }
      }
     case 41:
     if(_GLF_DEAD(false))
      break;
     ivec2 _GLF_SWITCH_0_75v[32];
     {
      vec4 _GLF_outVarBackup_GLF_color;
      if(_GLF_DEAD(false))
       {
        _GLF_color = vec4(4.3, -2582.5109, 820.625, -7750.5862);
        if(_GLF_DEAD(false))
         {
          _GLF_color = (vec2(6.6, -789.653) * mat4x2(-1.7, -1.6, -47.29, -2.8, 1.7, -6496.2942, 2.0, 4.8));
         }
       }
      _GLF_outVarBackup_GLF_color = _GLF_color;
      _GLF_color = vec4(4020.4961, -826.496, 9.3, 0.6);
      if(_GLF_WRAPPED_IF_TRUE(true))
       {
        _GLF_color = _GLF_outVarBackup_GLF_color;
        if(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))
         break;
       }
      {
       vec4 _GLF_outVarBackup_GLF_color;
       _GLF_outVarBackup_GLF_color = _GLF_color;
       _GLF_color = vec4(-51.40, 4898.0595, 8496.8527, -4470.9205);
       if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))
        {
         _GLF_color = _GLF_outVarBackup_GLF_color;
        }
      }
     }
     if(_GLF_DEAD(false))
      {
       float donor_replacementGLF_dead5c_im = _GLF_FUZZED(length(vec4(pow(_GLF_IDENTITY(vec3(-98.68, 861.154, 4744.9647), (vec3(-98.68, 861.154, 4744.9647)) - vec3(0.0, 0.0, 0.0)), vec3(612.259, -9079.4142, 923.699)), 96.95)));
       float donor_replacementGLF_dead5c_re = _GLF_FUZZED(floor(ref));
       int donor_replacementGLF_dead5iteration = _GLF_FUZZED(i);
       float donor_replacementGLF_dead5x = _GLF_FUZZED(ref);
       for(
           int GLF_dead5k = 0;
           GLF_dead5k < 1000;
           GLF_dead5k ++
       )
        {
         if(donor_replacementGLF_dead5x * donor_replacementGLF_dead5x + GLF_dead3h_r * GLF_dead3h_r > 4.0)
          {
           break;
          }
         float GLF_dead5x_new = donor_replacementGLF_dead5x * donor_replacementGLF_dead5x - GLF_dead3h_r * GLF_dead3h_r + donor_replacementGLF_dead5c_re;
         GLF_dead3h_r = 2.0 * donor_replacementGLF_dead5x * GLF_dead3h_r + donor_replacementGLF_dead5c_im;
         donor_replacementGLF_dead5x = GLF_dead5x_new;
         donor_replacementGLF_dead5iteration ++;
        }
      }
     default:
     1;
    }
  }
 c.x = mod(c.x, 1.0);
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(_GLF_IDENTITY(5.9, min(5.9, 5.9)), -0.7, -9.4, 9.9);
  if(_GLF_DEAD(false))
   {
    _GLF_color = floor(vec4(-791.641, -9.4, -7430.1167, 8.6));
   }
  if(_GLF_WRAPPED_IF_TRUE(true))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 {
  vec4 _GLF_outVarBackup_GLF_color;
  _GLF_outVarBackup_GLF_color = _GLF_color;
  _GLF_color = vec4(-2.6, -98.42, -4.9, 8.0);
  if(_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))
   {
    _GLF_color = _GLF_outVarBackup_GLF_color;
   }
 }
 c.y = mod(c.y, 1.0);
 c.z = mod(_GLF_IDENTITY(c, clamp(c, _GLF_IDENTITY(c, min(c, c)), c)).z, 1.0);
 _GLF_color = c;
}
