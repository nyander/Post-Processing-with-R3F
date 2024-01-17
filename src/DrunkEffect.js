import React from 'react'
import { BlendFunction, Effect } from 'postprocessing'
import { Uniform } from 'three'

const fragmentShader = /* glsl */`

uniform float frequency;
uniform float amplitude;
uniform float offset;

void mainUv(inout vec2 uv)
 {
   uv.y += sin(uv.x * frequency + offset) * amplitude;
 }

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
 {
   //  vec4 color = inputColor;
   //  color.rgb *= vec3(1,1.5,0.75);
    outputColor = vec4(0.8,1.0,0.5, inputColor.a);
 }`

export default class DrunkEffect extends Effect
{
    constructor({frequency = 0.1, amplitude = 2.0, blendFunction = BlendFunction.DARKEN})
    {
       super(
        'DrunkEffect',
        fragmentShader,
        {
         blendFunction,
         uniforms: new Map([
            [ 'frequency',new Uniform(frequency)],
            [ 'amplitude',new Uniform(amplitude)],
            [ 'offset', new Uniform(0) ] 
         ])
        }
       )
    }

    update(renderer, inputBuffer, deltaTime) 
    {
      this.uniforms.get('offset').value += deltaTime;
    }
}