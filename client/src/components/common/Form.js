import Joi from 'joi-browser'
import Input from './Input';
import Select from './Select';
import ConfirmPassword from './ConfirmPassword';

    const validate = (data, schema,) => {
        const result = Joi.validate(data, schema, { abortEarly: false })
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors
    }

    const validateProperty = ({ name, value }, schema) => {
        const obj = { [name]: value };
        const newSchema = { [name]: schema[name]}
        const {error} = Joi.validate(obj, newSchema)
        return error ? error.details[0].message : null;
    }

    const handleSubmit= ({ setErrors, data, schema }, doSubmit, e) => {
        e.preventDefault();
        const newErrors = validate(data, schema)
        setErrors(newErrors || {})
        if (newErrors) return

        doSubmit();
    }

    const handleChange = (formProps, { currentTarget: input }) => {
        const { data, setData, errors, setErrors, schema } = formProps
        const errorMessage = validateProperty(input, schema);
        let newErrors = {...errors};
        if (errorMessage) {newErrors[input.name] = errorMessage;
        }
        else delete newErrors[input.name]

        const newData = {...data}
        newData[input.name] = input.value
        setData(newData)
        setErrors(newErrors)
    }

    const renderInput  = (name, label, formProps, type = "text") => {
        return (
        <Input
            type={type}
            name={name}
            value={formProps.data[name]}
            label={label}
            onChange={(e) => handleChange(formProps, e)}
            error={formProps.errors[name]}
        />
        );
    }
    
    const renderConfirmPassword = (name, label, formProps, submitted) => {
        return (
        <ConfirmPassword
            name={name}
            value={formProps.data[name]}
            label={label}
            onChange={(e) => handleChange(formProps, e)}
            error={formProps.errors[name]}
            submitted={submitted}
        />
        );
    }

    const renderButton = (label, { data, schema }) =>{
        return (
            <button disabled={validate(data, schema)} className="btn btn-primary mt-3">
                {label}
            </button>
        );
    }

    const renderSelect = (name, label, formProps, options) =>{
        return (
            <Select
                name={name}
                value={formProps.data[name]}
                label={label}
                options={options}
                onChange={(e) => handleChange(formProps, e)}
                error={formProps.errors[name]}
            />
        );
    }

    const renderFileSelect = (formProps) =>{
        return(
            <div>
                <div className="input-group mt-3">
                    <label htmlFor="selectedFile" class="btn btn-outline-primary">
                        <input hidden type="file" name='selectedFile' id='selectedFile' encType="multipart/form-data" onChange={(e) => fileSelectedHandler(formProps, e)} />
                        Choose file
                    </label>
                    <p className="ml-3 mt-2">
                        {formProps.data.selectedFile?.name ? formProps.data.selectedFile.name : "No file selected"}
                    </p>
                </div>
                {formProps.errors?.selectedFile && <div className="alert alert-danger py-1">{formProps.errors?.selectedFile}</div>}
            </div>
        )
    }

    const fileSelectedHandler = ({ data, setData }, e) => {
        const newData = {...data}
        newData.selectedFile = e.target.files[0]
        setData(newData)
    };

    const Form = {
        validate,
        validateProperty,
        handleSubmit,
        renderInput,
        handleChange,
        renderConfirmPassword,
        renderButton,
        renderSelect,
        renderFileSelect,
        fileSelectedHandler,
        
    }

export default Form