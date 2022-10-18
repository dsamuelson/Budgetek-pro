import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useMutation } from '@apollo/client';
import { ADD_INCOME, ADD_EXPENSE, ADD_UOME } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux'

function IandEModal() {

    const dispatch = useDispatch();
    const modalStore = useSelector((state) => state.modalValue);
    const modalValue = modalStore.modalValue;

    const [iModalTitle, setIModalTitle] = useState('');
    const [iModalValue, setIModalValue] = useState('');
    const [iiItemize, setiItemize] = useState(false);
    const [iModalFrequency, setIModalFrequency] = useState('');
    const [iModalPrimary, setIModalPrimary] = useState(false);
    const [payDayDate, setPayDayDate] = useState(new Date())

    const [itemizeMTitle, setItemizeMTitle] = useState('')
    const [itemizeMValue, setItemizeMValue] = useState('')
    const [itemizeMPaid, setItemizeMPaid] = useState(false)
    const [itemizeMPresubmit, setItemizeMPresubmit] = useState([]);
    const [itemizeMSubmit, setItemizeMSubmit] = useState([]);

    const [eModalTitle, setEModalTitle] = useState('');
    const [eModalValue, setEModalValue] = useState('');
    const [eModalFrequency, setEModalFrequency] = useState('');
    const [eModalCategory, setEModalCategory] = useState('');
    const [eModalVital, setEModalVital] = useState(false);
    const [dueDateDate, setDueDateDate] = useState(new Date())

    const [ addIncome ] = useMutation(ADD_INCOME)
    const [ addExpense ] = useMutation(ADD_EXPENSE)
    const [addUOMe] = useMutation(ADD_UOME)

    const loggedIn = Auth.loggedIn();

    useEffect(() => {
        if (itemizeMPresubmit.length){
            let oldValue = 0.00
                for (let i = 0; i < itemizeMPresubmit.length; i ++) {
                    if (!itemizeMPresubmit[i].iPaid){
                        setIModalValue( oldValue += parseFloat(itemizeMPresubmit[i].iValue))
                    }
                }
            };
    },[itemizeMPresubmit, setItemizeMPresubmit])

    function iandEMToggle() {
            dispatch({
                type: "TOGGLE_MODAL",
                modalValue: 'None'
            })        
    }

    async function submitIncomeModal(e) {
        
        e.preventDefault();
        try {
            await addIncome({
                variables: {
                    incomeTitle: iModalTitle,
                    incomeValue: iModalValue.toString(),
                    incomeFrequency: iModalFrequency,
                    primaryIncome: iModalPrimary,
                    payDay: payDayDate,
                    uomePayInfo: [...itemizeMSubmit]
                }
                
            });
        } catch (error) {
            console.log(error);
        }

        dispatch({
            type: "TOGGLE_MODAL",
            modalValue: 'None'
        })
    }

    async function submitExpenseModal(e) {
        e.preventDefault();
        try {
            await addExpense({
                variables: {
                    expenseTitle: eModalTitle,
                    expenseValue: eModalValue,
                    expenseFrequency: eModalFrequency,
                    vitalExpense: eModalVital,
                    expenseCategory: eModalCategory,
                    dueDate: dueDateDate,
                }
            });
        } catch (error) {
            console.log(error);
        }

        dispatch({
            type: "TOGGLE_MODAL",
            modalValue: 'None'
        })

    }

    async function submitItemizeLI(e) {
        e.preventDefault();
        let tempId = Math.floor(Math.random() * parseInt(new Date().valueOf()))
        let iPaid = itemizeMPaid
        let iValue = itemizeMValue
        let iTitle = itemizeMTitle
        let forDisplayI = [{tempId, iPaid, iValue, iTitle}]
        let currentI = [{uomePaid: iPaid, uomeValue: iValue, uomeTitle: iTitle}]
        setItemizeMPresubmit((prev) => [...prev, ...forDisplayI])
        setItemizeMSubmit((prev) => [...prev, ...currentI]);
    }

    return (
        <div className="ieModal">
            <h2>ADD</h2>
            {loggedIn && modalValue === "Income" && (
                <form className="incomeForm">
                    <label>Income Title: 
                        <input type='text' id="ITitle" name="ITitle" onChange={(e) => setIModalTitle(e.target.value)}/>
                    </label>
                    <label>Pay Amount: 
                        <input type='text' id='IValue' name="IValue" value={iModalValue} onChange={(e) => setIModalValue(e.target.value)} disabled={iiItemize}/>
                        (or is this itemized?
                        <input type='checkbox' id='Iitemize' onChange={(e) => setiItemize(e.target.checked)}/>
                        )
                    </label>
                    {iiItemize && (
                        <div className="iItemizeTableCont">
                        <table className="iItemizeTable">
                            <thead>
                                <tr>
                                    <th>Item Title</th>
                                    <th>Item Value</th>
                                    <th>Item Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                            {itemizeMPresubmit.length >= 1 && itemizeMPresubmit.map((lineItem) => {
                                return (
                                    <tr
                                    key={lineItem.tempId}>
                                        <td>{lineItem.iTitle}</td>
                                        <td>{lineItem.iValue}</td>
                                        <td><input type='checkbox' id='itemizePaid' name='itemizePaid' checked={lineItem.iPaid} disabled={true}/></td>
                                    </tr>
                                )})}
                                <tr>
                                    <td><input type='text' id="itemizeTitle" name="itemizeTitle" onChange={(e) => setItemizeMTitle(e.target.value)}/></td>
                                    <td><input type='text' id='itemizeValue' name="itemizeValue" onChange={(e) => setItemizeMValue(e.target.value)}/></td>
                                    <td><input type='checkbox' id='itemizePaid' name='itemizePaid' checked={itemizeMPaid} onChange={(e) => setItemizeMPaid(e.target.checked)}/></td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={submitItemizeLI}>Add Item</button>
                        </div>
                    )}
                    <label>Frequency: 
                        <select id="IFrequency" name="IFrequency" onChange={(e) => setIModalFrequency(e.target.value)}>
                            <option>--None--</option>
                            <option value='once'>Once</option>
                            <option value='daily'>Daily</option>
                            <option value='monthly'>Monthly</option>
                            <option value='yearly'>Yearly</option>
                            <option value='other'>Other</option>
                        </select>
                    </label>
                    <label>Primary Income: 
                        <input type='checkbox' id="IPrimary" name="IPrimary" onChange={(e) => setIModalPrimary(e.target.checked)}/>
                    </label>
                    <label>Pay Day: 
                        <DatePicker 
                        selected={payDayDate}
                        onChange={(date) => setPayDayDate(date)}
                        />
                    </label>
                    <input type='submit' value="Add Income" onClick={event => submitIncomeModal(event)}></input>
                    <input type='button' value="Cancel" onClick={iandEMToggle}></input>
                </form>
            )}
            {loggedIn && modalValue === 'Expense' && (
                <form className="expenseForm">
                    <label>Expense Title:
                        <input type='text' id="ETitle" name="ETitle" onChange={(e) => setEModalTitle(e.target.value)}/>
                    </label>
                    <label>Amount Due:
                        <input type='text' id='EValue' name="EValue" onChange={(e) => setEModalValue(e.target.value)}/>
                    </label>
                    <label>Frequency:
                        <select id="EFrequency" name="EFrequency" onChange={(e) => setEModalFrequency(e.target.value)}>
                            <option>--None--</option>
                            <option value='once'>Once</option>
                            <option value='daily'>Daily</option>
                            <option value='monthly'>Monthly</option>
                            <option value='yearly'>Yearly</option>
                            <option value='other'>Other</option>
                        </select>
                    </label>
                    <label>Vital Expense:
                        <input type='checkbox' id="EVital" name="EVital" onChange={(e) => setEModalVital(e.target.checked)}/>
                    </label>
                    <label>Main Category of Expense:
                    <select id="ECategory" name="ECategory" onChange={(e) => setEModalCategory(e.target.value)}>
                            <option>--None--</option>
                            <option value='utilities'>Utilities</option>
                            <option value='commercial'>Commercial</option>
                            <option value='credit'>Credit</option>
                            <option value='subscription'>Subscription</option>
                            <option value='other'>Other</option>
                        </select>
                    </label>
                    <label>Due Date:
                        <DatePicker 
                        selected={dueDateDate}
                        onChange={(date) => setDueDateDate(date)}
                        />
                    </label>
                    <input type='submit' value="Add Expense" onClick={event => submitExpenseModal(event)}></input>
                    <input type='button' value="Cancel" onClick={iandEMToggle}></input>
                </form>
            )}
        </div>  
    )
}

export default IandEModal;