'use client';

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const SuccessInput = ({ slug }: { slug: string }) => {
    const router = useRouter();
    return (
        <div className='flex flex-col gap-y-4'>
        <div className='flex gap-x-4'>
            <Input readOnly defaultValue={`${typeof window !== 'undefined' ? window.location.origin : ''}/${slug}`} />
            <Button onClick={() => navigator.clipboard.writeText(`${typeof window !== 'undefined' ? window.location.origin : ''}/${slug}`).then(() => {
                toast.success("Copied to clipboard");
            })
                .catch(() => {
                    toast.error("An error occurred");
                })}>
                Copy Url
            </Button>
        </div>
            <Button onClick={()=>router.push('/')}>Create Another Link</Button>
        </div>
    )
}

