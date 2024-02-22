const GenderCheckbox = (props) => {
    const { options, name, value, onChange } = props;
    return (
        <div className='flex'>
            {
                (options || []).map((option, key) => (
                    <div className='form-control' key={option + "-" + key}>
                        <label className={`label gap-2 cursor-pointer`}>
                            <span className='label-text'>{option}</span>
                            <input
                                type='checkbox'
                                name={name}
                                className='checkbox border-slate-900'
                                value={option}
                                checked={value === option}
                                onChange={onChange}
                            />
                        </label>
                    </div>
                ))
            }
        </div>
    );
};
export default GenderCheckbox;