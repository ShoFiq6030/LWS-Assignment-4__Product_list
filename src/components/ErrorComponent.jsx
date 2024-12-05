/* eslint-disable react/prop-types */

function Error({ message }) {
  return (
    <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded-md">
      <div className="flex items-center">
        <svg
          className="h-5 w-5 text-red-500 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7a1 1 0 112 0v-4a1 1 0 10-2 0v4zm0 4a1 1 0 112 0 1 1 0 01-2 0z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

export default Error;
