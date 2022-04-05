import React from "react";

const Form = (props)=>{

    const {submitHandler, onChangeHandler, grocery, errors, buttonText } = props;

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Item Name</label>
                    <input name="name" value={grocery.name} onchange={(e)=> onChangeHandler(e)} type="text" />
                    <br />
                    {
                        errors.name?
                            <span>{errors.name.message}</span>
                            :null
                    }
                </div>
                <div>
                    <label>Type</label>
                    <select value={grocery.type} name="type" onChange={onChangeHandler}>
                        <option defaultValue hidden>Select a Type</option>
                        <option value="Produce">Produce</option>
                        <option value="Canned Goods">Canned Goods</option>
                        <option value="Baking/Spices">Baking/Spices</option>
                        <option value="Household Goods">Household Goods</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Frozen Foods">Frozen Foods</option>
                        <option value="Paper/Plastic">Paper/Plastic</option>
                        <option value="Bread/Grains">Bread/Grains</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Condiments">Condiments</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Meat/Protein">Family</option>
                        <option value="Dairy">Animated</option>
                        <option value="Toiletries">Toiletries</option>
                        <option value="Pet Care">Pet Care</option>
                    </select>
                    <br />
                    {
                        errors.type?
                        <span>{errors.type.message}</span>
                        :null
                    }
                </div>
                <div>
                    <label>Quantity</label>
                    <input name="quantity" value={grocery.quantity} onChange={onChangeHandler} type="number" />
                    <br />
                    {
                        errors.quantity?
                            <span>{errors.quantity.message}</span>
                        :null
                    }
                </div>
                <div>
                    <label>boxArt</label>
                    <input name="boxArt" value={grocery.boxArt} onChange={onChangeHandler} type="text" />
                    <br />
                    {
                        errors.boxArt ?
                            <span>{errors.boxArt.message}</span>
                            : null
                    }
                </div>
                <button>{buttonText}</button>
            </form>
        </div>
    )
}

export default Form;