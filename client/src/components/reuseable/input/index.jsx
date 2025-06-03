import { Controller } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";


export const Input = ({
    label = '',
    name,
    defaultValue = '',
    type = 'text',
    disabled = false,
    placeholder,
    register,
    required = true,
    errors,
    value,
    onChange,
    colorClass
}) => {
    return (
        <div className="w-full">
            <label className='text-base'>
                {label}
            </label>
            <input
                type={type}
                name={name}
                disabled={disabled}
                defaultValue={defaultValue}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                // className='input-field input-select-field'
                className={`
                    w-full px-3 py-[6px]  border rounded-md border-[#5b78f6] outline-none focus:border-[#5b78f6] focus:ring-[#5b78f6] transition-all duration-200 text-white text-base font-normal
                    ${colorClass}
                    ${errors && errors[name] ? "border-red-600  " : " focus:ring-[1px]"}
                    `}
                {...register(name, { required: required })}
            />
           <div className="error-text flex items-center justify-end relative text-sm text-red-500">
              {
                errors && errors[name] && (
                  <span>
                    {errors[name].message || `${label || 'This field'} is required`}
                    <span>
                      <img
                        className="w-4 h-4 absolute -top-7 right-5"
                        src="https://i.postimg.cc/rwxT9jXz/exclamation-mark.webp"
                        alt="error-logo"
                      />
                    </span>
                  </span>
                )
              }
            </div>

        </div>
    );
};



export const TagInput = ({
  label = '',
  name,
  placeholder = 'Enter tags',
  control,
  errors,
  required = true,
  serverError = null, // optional server-side error
}) => {
  const hasError = !!errors?.[name] || !!serverError;

  return (
    <div className="w-full">
      {label && <label className="text-base block mb-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={{ required: { value: required, message: `${label || 'This field'} is required` } }}
        render={({ field }) => (
          <TagsInput
            {...field}
            value={field.value || []}
            onChange={field.onChange}
            name={field.name}
            placeHolder={placeholder}
            classNames={{
              tag: "bg-[#5b78f6] text-black px-2 py-1 rounded mr-2 mt-1",
              tagRemoveIcon: "ml-1 text-white cursor-pointer",
            }}
          />
        )}
      />

      {hasError && (
        <div className="text-sm text-red-500 mt-1 relative text-end">
          {errors?.[name]?.message || serverError}
          <img
            className="w-4 h-4 absolute -top-8 right-5"
            src="https://i.postimg.cc/rwxT9jXz/exclamation-mark.webp"
            alt="error"
          />
        </div>
      )}
    </div>
  );
};