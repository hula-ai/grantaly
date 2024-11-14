import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const ProjectInitiate = () => {
    let [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const router = useRouter();

    return (
        <>
            <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
                <div className='hidden lg:block'>
                    <button type="button" className='text-lg text-blue font-medium' 
                    onClick={ () => {
                        //  openModal() // if open Modal
                        router.push('/project-initialization')
                        }}>
                        Project Initiate
                    </button>
                </div>
            </div>

        </>
    )
}

export default ProjectInitiate;
