import Image from 'next/image'
import React from 'react'

const layout = ({ children }) => {
    return (
        <main className='auth-container'>
            <section className='auth-form'>
                <div className="auth-box">
                    <Image src="/icons/logo.svg" width={40} height={40} alt="logo" />
                    <h1 className='text-2xl font-semibold text-white' >BookWise</h1>

                    {children}
                </div>
            </section>
            <section className='auth-illustration'>
                <Image src="/images/auth-illustration.png" className='size-full object-cover' width={1000} height={1000} alt="illustration" />
            </section>
        </main>
    )
}

export default layout
