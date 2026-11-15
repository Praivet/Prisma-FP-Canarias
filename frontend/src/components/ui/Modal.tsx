import type { ReactNode } from 'react'
import Button from './Button'

interface ModalProps {
    title: string
    children: ReactNode
    onClose: () => void
}

function Modal({ title, children, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                <h2>{title}</h2>
                <div className="mt-4">{children}</div>
                <div>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Modal
