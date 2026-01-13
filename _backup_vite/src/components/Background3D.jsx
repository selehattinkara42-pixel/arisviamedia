import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const Particles = ({ count = 5000 }) => {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10
            p[i * 3 + 1] = (Math.random() - 0.5) * 10
            p[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        return p
    }, [count])

    const pointsRef = useRef()

    useFrame((state) => {
        const { clock } = state
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05
            pointsRef.current.rotation.x = clock.getElapsedTime() * 0.02
        }
    })

    return (
        <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#D4AF37"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

const AnimatedSphere = () => {
    const meshRef = useRef()

    useFrame((state) => {
        const { clock } = state
        if (meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime() * 0.2
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
        }
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
                <MeshDistortMaterial
                    color="#D4AF37"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.1}
                    metalness={0.9}
                />
            </Sphere>
        </Float>
    )
}

const MouseLight = () => {
    const lightRef = useRef()
    const { viewport, mouse } = useThree()

    useFrame(() => {
        if (lightRef.current) {
            const x = (mouse.x * viewport.width) / 2
            const y = (mouse.y * viewport.height) / 2
            lightRef.current.position.set(x, y, 2)
        }
    })

    return <pointLight ref={lightRef} intensity={2} color="#D4AF37" />
}

const Background3D = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-[#030712]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-200" />

            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#D4AF37" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#8B5CF6" />

                <Particles />
                <AnimatedSphere />
                <MouseLight />

                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
        </div>
    )
}

export default Background3D
