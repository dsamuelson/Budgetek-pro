import React, { useState } from "react";
import Auth from '../../utils/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useMutation } from '@apollo/client';
import { ADD_INCOME, ADD_EXPENSE } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux'

function IandEModal() {

    const dispatch = useDispatch();
    const modalStore = useSelector((state) => state.modalValue);
    const modalValue = modalStore.modalValue;

    const [iModalTitle, setIModalTitle] = useState('');
    const [iModalValue, setIModalValue] = useState('');
    const [iModalFrequency, setIModalFrequency] = useState('');
    const [iModalPrimary, setIModalPrimary] = useState();
    const [payDayDate, setPayDayDate] = useState(new Date())

    const [eModalTitle, setEModalTitle] = useState('');
    const [eModalValue, setEModalValue] = useState('');
    const [eModalFrequency, setEModalFrequency] = useState('');
    const [eModalCategory, setEModalCategory] = useState('');
    const [eModalVital, setEModalVital] = useState();
    const [dueDateDate, setDueDateDate] = useState(new Date())

    const [ addIncome ] = useMutation(ADD_INCOME)
    const [ addExpense ] = useMutation(ADD_EXPENSE)



    const loggedIn = Auth.loggedIn();

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
                    incomeValue: iModalValue,
                    incomeFrequency: iModalFrequency,
                    primaryIncome: iModalPrimary,
                    payDay: payDayDate,
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

    return (
        <div>
            {loggedIn && modalValue === "Income" && (
                <form>
                    <label>Income Title:
                        <input type='text' id="ITitle" name="ITitle" onChange={(e) => setIModalTitle(e.target.value)}/>
                    </label>
                    <label>Pay Amount:
                        <input type='text' id='IValue' name="IValue" onChange={(e) => setIModalValue(e.target.value)}/>
                    </label>
                    <label>Frequency
                        <select id="IFrequency" name="IFrequency" onChange={(e) => setIModalFrequency(e.target.value)}>
                            <option>--None--</option>
                            <option value='once'>Once</option>
                            <option value='daily'>Daily</option>
                            <option value='monthly'>Monthly</option>
                            <option value='yearly'>Yearly</option>
                            <option value='other'>Other</option>
                        </select>
                    </label>
                    <label>Primary Income
                        <input type='checkbox' id="IPrimary" name="IPrimary" onChange={(e) => setIModalPrimary(e.target.checked)}/>
                    </label>
                    <label>Pay Day
                        <DatePicker 
                        selected={payDayDate}
                        onChange={(date) => setPayDayDate(date)}
                        />
                    </label>
                    <input type='submit' value="Submit" onClick={event => submitIncomeModal(event)}></input>
                    <input type='button' value="Cancel" onClick={iandEMToggle}></input>
                </form>
            )}
            {loggedIn && modalValue === 'Expense' && (
                <form>
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
                    <input type='submit' value="Submit" onClick={event => submitExpenseModal(event)}></input>
                    <input type='button' value="Cancel" onClick={iandEMToggle}></input>
                </form>
            )}
        </div>  
    )
}

export default IandEModal;