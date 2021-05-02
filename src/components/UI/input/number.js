import React from "react"

export let NumberInput = ({value, onChange}) => {
    
    const [inputValue, setInputValue] = React.useState(String(value === undefined || value === null ? "" : value))
    React.useEffect(() => {setInputValue(value)}, [value])
    let validateValue = (string) => {
        return string.replace(/\D/, "")
    }
    let onBlur = () => {
        onChange(inputValue ? Number(inputValue) : undefined)
    }
    
    return <input value={inputValue} onChange={(event) => setInputValue(validateValue(event.target.value))} onBlur={onBlur} />
}