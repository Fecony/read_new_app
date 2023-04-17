import { IconLoader2 } from '@tabler/icons-react';

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
    if (!isLoading) return null;

    return (
        <div className='max-h-[15rem] flex flex-col rounded-xl'>
            <div className='flex flex-auto flex-col justify-center items-center p-4 md:p-5'>
                <div className='flex justify-center'>
                    <IconLoader2
                        className='animate-spin text-gray-600'
                        strokeWidth={3}
                        role='status'
                        aria-label='loading'
                    />
                </div>
            </div>
        </div>
    );
};
