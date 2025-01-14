type TErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: TErrorMessageProps) => {
  return (
    <p className='text-center text-lg p-12'>
      <span>⛔️</span> {message}
    </p>
  );
};
