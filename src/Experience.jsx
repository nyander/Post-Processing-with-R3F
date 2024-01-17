import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, ToneMapping, Vignette } from '@react-three/postprocessing'
import {BlendFunction, GlitchMode} from 'postprocessing'
import { useControls } from 'leva';
import Drunk from './Drunk';
import { useRef } from 'react';


export default function Experience()
{

    const drunkRef = useRef();

    const {vignetteOn,offset, darkness} = useControls('Vignette',{
        vignetteOn: false,
        offset : {value: 0.25, min:0, max:1, step:0.01},
        darkness: {value: 1, min:0, max:3, step:0.01}
    })

    const {glitchOn,delay, duration, strength} = useControls('Glitch',{
        glitchOn: false,
        delay : [0.5,1],
        duration: [0.1,0.3],
        strength : [0.2,0.4]
    })

    const {noiseOn} = useControls('Noise', {
        noiseOn: false,
    })

    const {uAmplitude,uFrequency} = useControls('Drunk', {
        uAmplitude : {value: 2.0, min:0, max:12, step:0.05},
        uFrequency : {value: 0.1, min:0, max:1, step:0.05}
    })

    return <>

        <color args={['#fff'] } attach="background"/>
        <EffectComposer disableNormalPass >
            {vignetteOn == true && <Vignette
                offset={offset}
                darkness={darkness}
                blendFunction={BlendFunction.NORMAL}
                 />}
                {glitchOn == true && <Glitch
                    delay={delay}
                    duration={duration}
                    strength={strength}
                    mode={GlitchMode.DISABLED} />}
                {noiseOn && <Noise premultiply blendFunction={BlendFunction.OVERLAY} />}
            {/* <Bloom mipmapBlur/> */}
            {/* <DepthOfField
                focusDistance={0.025}
                focalLength={0.025}
                bokehScale={6}
                 /> */}
                 <Drunk
                    ref = {drunkRef}
                    frequency = {uAmplitude}
                    amplitude = { uFrequency}
                    blendFunction = {BlendFunction.DARKEN}
                 />
            <ToneMapping />
        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}