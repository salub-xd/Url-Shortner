import { SuccessInput } from '@/components/app/Success-Input';
import React from 'react'

interface SuccessProps {
    searchParams: {
        [key: string]: string;
    }
}

const SuccessPage = ({ searchParams }: SuccessProps) => {
    return (
        <div className='mt-10 max-w-lg mx-4 px-4 py-8  rounded-md sm:mx-auto'>
            <div className='flex flex-col text-sm md:text-lg gap-y-2'>
                <p className='text-sm md:text-lg font-bold font-mono'>Website Url</p>
                <p className='text-sm md:text-lg '>Your Link Generated Successfully!</p>
                <div>
                    <SuccessInput slug={searchParams.slug} />
                </div>
            </div>
        </div>
    )
}

export default SuccessPage;
