import React, { useState, useEffect } from 'react'
import Auth from '../../utils/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useMutation } from '@apollo/client';
import { ADD_INCOME, ADD_EXPENSE } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux'

function EditModal(props) {

    const [useProps, setProps ] = useState(props)

    const dispatch = useDispatch();
    const modalStore = useSelector((state) => state.modalValue);
    const modalValue = modalStore.modalValue;
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [iModalTitle, setIModalTitle] = useState('');
    const [iModalValue, setIModalValue] = useState('');
    const [iModalInterest, setIModalInterest] = useState('');
    const [iiItemize, setiItemize] = useState(false);
    const [iModalFrequency, setIModalFrequency] = useState({});
    const [iModalPrimary, setIModalPrimary] = useState(false);
    const [payDayDate, setPayDayDate] = useState(new Date())

    const [itemizeMTitle, setItemizeMTitle] = useState('')
    const [itemizeMValue, setItemizeMValue] = useState('')
    const [itemizeMPaid, setItemizeMPaid] = useState(false)
    const [itemizeMPresubmit, setItemizeMPresubmit] = useState([]);
    const [itemizeMSubmit, setItemizeMSubmit] = useState([]);

    const [eModalTitle, setEModalTitle] = useState('');
    const [eModalValue, setEModalValue] = useState('');
    const [eItemize, setEItemize] = useState(false);
    const [eModalFrequency, setEModalFrequency] = useState({});
    const [eModalCategory, setEModalCategory] = useState('');
    const [addETotal, setAddETotal] = useState(false)
    const [eTotalValue, setETotalValue] = useState('')
    const [eAPRTotal, setEAPRTotal] = useState('')
    const [eModalVital, setEModalVital] = useState(false);
    const [dueDateDate, setDueDateDate] = useState(new Date())

    const [ addIncome ] = useMutation(ADD_INCOME)
    const [ addExpense ] = useMutation(ADD_EXPENSE)

    const loggedIn = Auth.loggedIn();

    const resetIandEState = () => {
        setIModalTitle('')
        setIModalValue('')
        setiItemize(false)
        setIModalFrequency({})
        setIModalPrimary('')
        setPayDayDate(new Date())

        setItemizeMTitle('')
        setItemizeMValue('')
        setItemizeMPaid(false)
        setItemizeMPresubmit([])
        setItemizeMSubmit([])

        setEModalTitle('')
        setEModalValue('')
        setEItemize(false)
        setEModalFrequency('')
        setEModalCategory('')
        setEModalVital(false);
        setDueDateDate(new Date())
    }

    useEffect(() => {
        setProps(props)
    }, [props])

    useEffect(() => {
        console.log(props)
    }, [useProps, setProps])

    useEffect(() => {
        if (itemizeMPresubmit.length){
            let oldValue = 0.00
                for (let i = 0; i < itemizeMPresubmit.length; i ++) {
                    if (!itemizeMPresubmit[i].iPaid){
                        oldValue += parseFloat(itemizeMPresubmit[i].iValue)
                    }
                }
                setIModalValue( oldValue )
                setEModalValue( oldValue )
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
        console.log("_id: ", useProps._id)
        console.log("incomeTitle: ", iModalTitle)
        console.log("incomeValue: ", iModalValue.toString())
        console.log("incomeInterest: ", iModalInterest.toString())
        console.log("incomeFrequency: ", iModalFrequency)
        console.log("primaryIncome: ", iModalPrimary)
        console.log("payDay: ", payDayDate)
        console.log("uomePayInfo: ", [...itemizeMSubmit])
        // try {
        //     await updateIncome({
        //         variables: {
        //             _id: useProps._id,
        //             incomeTitle: iModalTitle,
        //             incomeValue: iModalValue.toString(),
        //             incomeInterest: iModalInterest.toString(),
        //             incomeFrequency: iModalFrequency,
        //             primaryIncome: iModalPrimary,
        //             payDay: payDayDate,
        //             uomePayInfo: [...itemizeMSubmit]
        //         }
                
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
        // resetIandEState();
        // dispatch({
        //     type: "TOGGLE_MODAL",
        //     modalValue: 'None'
        // })
    }

    async function submitExpenseModal(e) {
        e.preventDefault();
        console.log("_id: ", useProps._id)
        console.log("expenseTitle: ", eModalTitle)
        console.log("expenseValue: ", eModalValue.toString())
        console.log("expenseFrequency: ", eModalFrequency)
        console.log("vitalExpense: ", eModalVital)
        console.log("expenseCategory: ", eModalCategory)
        console.log("totalExpenseValue: ", eTotalValue)
        console.log("expenseAPR: ", eAPRTotal.toString())
        console.log("dueDate: ", dueDateDate)
        console.log("iouInfo: ", [...itemizeMSubmit])
        // try {
        //     await updateExpense({
        //         variables: {
        //             _id: useProps._id,
        //             expenseTitle: eModalTitle,
        //             expenseValue: eModalValue.toString(),
        //             expenseFrequency: eModalFrequency,
        //             vitalExpense: eModalVital,
        //             expenseCategory: eModalCategory,
        //             totalExpenseValue: eTotalValue,
        //             expenseAPR: eAPRTotal.toString(),
        //             dueDate: dueDateDate,
        //             iouInfo: [...itemizeMSubmit]
        //         }
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
        // resetIandEState();
        // dispatch({
        //     type: "TOGGLE_MODAL",
        //     modalValue: 'None'
        // })

    }

    async function submitItemizeLI(e, target) {
        e.preventDefault();
        let tempId = Math.floor(Math.random() * parseInt(new Date().valueOf()))
        let iPaid = itemizeMPaid
        let iValue = itemizeMValue
        let iTitle = itemizeMTitle
        let forDisplayI = [{tempId, iPaid, iValue, iTitle}]
        let currentI = [{uomePaid: iPaid, uomeValue: iValue, uomeTitle: iTitle}]
        let currentE = [{iouPaid: iPaid, iouValue: iValue, iouTitle: iTitle}]
        setItemizeMPresubmit((prev) => [...prev, ...forDisplayI])
        if (target === 'income'){
            setItemizeMSubmit((prev) => [...prev, ...currentI]);
        } else if (target === 'expense') {
            setItemizeMSubmit((prev) => [...prev, ...currentE]);
        }
        
    }

    async function payDayBreakdown(options) {
        setIModalFrequency(payDayOptions => ({
            ...payDayOptions,
            ...options}))
    }

    async function DueDateBreakdown(options) {
        setEModalFrequency(dueDayOptions => ({
            ...dueDayOptions,
            ...options}))
    }


    return (
        <div className="ieModal">
            <h2>EDIT {modalValue === 'EditIncome'? 'INCOME' : 'EXPENSE'}</h2>
            {loggedIn && modalValue === "EditIncome" && (
                <form className="incomeForm">
                    <label>Income Title: <br />
                        <input type='text' id="ITitle" name="ITitle" onChange={(e) => setIModalTitle(e.target.value)} className='formTextInput' placeholder={iModalTitle}/>
                    </label>
                    <label>Pay Amount: <br />
                        <input type='text' id='IValue' name="IValue" value={iModalValue} onChange={(e) => setIModalValue(e.target.value)} disabled={iiItemize} className='formTextInput'/><br />
                    </label>
                    <label>Interest% Value (optional): <br />
                        <input type='text' id='IInterest' name="IInterest" onChange={(e) => setIModalInterest(e.target.value)} disabled={iiItemize} className='formTextInput'/><br />
                    </label>
                    <label>
                    <input type='checkbox' id='Iitemize' onChange={(e) => setiItemize(e.target.checked)}/>Itemize this Income<br />
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
                        <button onClick={(e) => submitItemizeLI(e, 'income')}>Add Item</button>
                        </div>
                    )}
                    <label>Frequency: 
                        <select id="IFrequency" name="IFrequency" onChange={(e) => payDayBreakdown({frequency: e.target.value})}>
                            <option>--None--</option>
                            <option value='once'>Once</option>
                            <option value='daily'>Daily</option>
                            <option value='monthly'>Monthly</option>
                            <option value='yearly'>Yearly</option>
                            <option value='other'>Other</option>
                        </select>
                    </label>
                    {iModalFrequency.frequency === "monthly" && (
                        <div>
                        <label>
                            Please Select what applies:
                            <div onChange={(e) => payDayBreakdown({isSameDay: e.target.value})}>
                                <input type='radio' value="sameDay" checked={iModalFrequency.isSameDay === 'sameDay'}/>Always on the {`${payDayDate.getDate()}`} Every Month <br />
                                <input type='radio' value='lastDay' checked={iModalFrequency.isSameDay === 'lastDay'}/>Always Last Day of the Month
                            </div>
                        </label>
                        <label>
                            Weekends
                            <div onChange={(e) => payDayBreakdown({countWeekends: e.target.value})}>
                                <input type='radio' value='preWeekends' checked={iModalFrequency.countWeekends === 'preWeekends'}/>Paid before weekends <br />
                                <input type='radio' value='postWeekends' checked={iModalFrequency.countWeekends === 'postWeekends'}/>Paid after weekends <br />
                                <input type='radio' value='ignore' checked={iModalFrequency.countWeekends === 'ignore'} />Weekends don't change anything
                            </div>
                        </label>
                        </div>
                    )}
                    {iModalFrequency.frequency === "yearly" && (
                        <div>
                            <label>
                                Please Select what applies:
                                <div onChange={(e) => payDayBreakdown({isSameDay: e.target.value})}>
                                    <input type='radio' value="sameDay" checked={iModalFrequency.isSameDay === 'sameDay'}/>Always on {`${monthName[payDayDate.getMonth()]} ${payDayDate.getDate()}`} Every year <br />
                                    <input type='radio' value='lastDay' checked={iModalFrequency.isSameDay === 'lastDay'}/>Always Last Day of {`${monthName[payDayDate.getMonth()]}`} <br />
                                    <input type='radio' value='firstDay' checked={iModalFrequency.isSameDay === 'firstDay'}/>Always First Day of {`${monthName[payDayDate.getMonth()]}`}
                                </div>
                            </label>
                            <label>
                                Weekends:
                                <div onChange={(e) => payDayBreakdown({countWeekends: e.target.value})}>
                                    <input type='radio' value='preWeekends' checked={iModalFrequency.countWeekends === 'preWeekends'}/>Paid before weekends <br />
                                    <input type='radio' value='postWeekends' checked={iModalFrequency.countWeekends === 'postWeekends'}/>Paid after weekends <br />
                                    <input type='radio' value='ignore' checked={iModalFrequency.countWeekends === 'ignore'} />Weekends don't change anything
                                </div>
                            </label>
                        </div>
                    )}
                    {iModalFrequency.frequency === "other" && (
                        <div>
                            <label>
                            Please Describe:
                            <div>
                                <input type='checkbox' value="hasCustom" checked={iModalFrequency.hasCustom === true} onChange={(e) => payDayBreakdown({hasCustom: e.target.checked})}/>Always <input type='text' onChange={(e) => payDayBreakdown({nValue: e.target.value})} placeholder='number'/> <select id="nUnit" name="nUnit" onChange={(e) => payDayBreakdown({nUnit: e.target.value})}>
                                            <option>--None--</option>
                                            <option value='days'>Days</option>
                                            <option value='months'>Months</option>
                                            <option value='years'>Years</option>
                                        </select> <br />
                                </div>
                                </label>
                                <label>
                                Weekends:
                                <div onChange={(e) => payDayBreakdown({countWeekends: e.target.value})}>
                                    <input type='radio' value='preWeekends' checked={iModalFrequency.countWeekends === 'preWeekends'}/>Paid before weekends <br />
                                    <input type='radio' value='postWeekends' checked={iModalFrequency.countWeekends === 'postWeekends'}/>Paid after weekends <br />
                                    <input type='radio' value='ignore' checked={iModalFrequency.countWeekends === 'ignore'} />Weekends don't change anything
                                </div>
                            </label>
                        </div>
                    )}
                    <label> 
                        <input type='checkbox' id="IPrimary" name="IPrimary" onChange={(e) => setIModalPrimary(e.target.checked)}/> Primary Income
                    </label>
                    <label>Pay Day: 
                        <DatePicker 
                        value={payDayDate}
                        selected={payDayDate}
                        onChange={(date) => {setPayDayDate(date); payDayBreakdown({day: date.getDate().toString()}); if (iModalFrequency.frequency === 'yearly'){payDayBreakdown({month: date.getMonth().toString()})}}}
                        className='formTextInput'/>
                    </label>
                    <input type='submit' value="Add Income" onClick={event => submitIncomeModal(event)} className='ieModalButton'></input>
                    <input type='button' value="Cancel" onClick={iandEMToggle} className='ieModalButton cancelButton'></input>
                </form>
            )}
            {loggedIn && modalValue === 'EditExpense' && (
                <form className="expenseForm">
                    <label>Expense Title:
                        <input type='text' id="ETitle" name="ETitle" onChange={(e) => setEModalTitle(e.target.value)} className='formTextInput'/>
                    </label>
                    <label>Amount Due:
                        <input type='text' id='EValue' name="EValue" onChange={(e) => setEModalValue(e.target.value)} disabled={eItemize} className='formTextInput'/>
                    </label>
                    <label>
                    <input type='checkbox' id='Iitemize' onChange={(e) => setEItemize(e.target.checked)}/>Itemize this Expense<br />
                    </label>
                    {eItemize && (
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
                        <button onClick={(e) => submitItemizeLI(e, 'expense')}>Add Item</button>
                        </div>
                    )}
                    <label>Frequency:
                        <select id="EFrequency" name="EFrequency" onChange={(e) => setEModalFrequency({frequency: e.target.value})}>
                            <option>--None--</option>
                            <option value='once'>Once</option>
                            <option value='daily'>Daily</option>
                            <option value='monthly'>Monthly</option>
                            <option value='yearly'>Yearly</option>
                            <option value='other'>Other</option>
                        </select>
                    </label>
                    {eModalFrequency.frequency === "monthly" && (
                        <div>
                        <label>
                            Please Select what applies:
                            <div onChange={(e) => DueDateBreakdown({isSameDay: e.target.value})}>
                                <input type='radio' value="sameDay" checked={eModalFrequency.isSameDay === 'sameDay'}/>Always on the {`${dueDateDate.getDate()}`} Every Month <br />
                                <input type='radio' value='lastDay' checked={eModalFrequency.isSameDay === 'lastDay'}/>Always Last Day of the Month
                            </div>
                        </label>
                        <label>
                            Weekends
                            <div onChange={(e) => DueDateBreakdown({countWeekends: e.target.value})}>
                                <input type='radio' value='preWeekends' checked={eModalFrequency.countWeekends === 'preWeekends'}/>Due before weekends <br />
                                <input type='radio' value='postWeekends' checked={eModalFrequency.countWeekends === 'postWeekends'}/>Due after weekends <br />
                                <input type='radio' value='ignore' checked={eModalFrequency.countWeekends === 'ignore'} />Weekends don't change anything
                            </div>
                        </label>
                        </div>
                    )}
                    {eModalFrequency.frequency === "yearly" && (
                        <div>
                            <label>
                                Please Select what applies:
                                <div onChange={(e) => DueDateBreakdown({isSameDay: e.target.value})}>
                                    <input type='radio' value="sameDay" checked={eModalFrequency.isSameDay === 'sameDay'}/>Always on {`${monthName[dueDateDate.getMonth()]} ${dueDateDate.getDate()}`} Every year <br />
                                    <input type='radio' value='lastDay' checked={eModalFrequency.isSameDay === 'lastDay'}/>Always Last Day of {`${monthName[dueDateDate.getMonth()]}`} <br />
                                    <input type='radio' value='firstDay' checked={eModalFrequency.isSameDay === 'firstDay'}/>Always First Day of {`${monthName[dueDateDate.getMonth()]}`}
                                </div>
                            </label>
                            <label>
                                Weekends:
                                <div onChange={(e) => DueDateBreakdown({countWeekends: e.target.value})}>
                                    <input type='radio' value='preWeekends' checked={eModalFrequency.countWeekends === 'preWeekends'}/>Due before weekends <br />
                                    <input type='radio' value='postWeekends' checked={eModalFrequency.countWeekends === 'postWeekends'}/>Due after weekends <br />
                                    <input type='radio' value='ignore' checked={eModalFrequency.countWeekends === 'ignore'} />Weekends don't change anything
                                </div>
                            </label>
                        </div>
                    )}
                    {eModalFrequency.frequency === "other" && (
                        <div>
                            <label>
                            Please Describe:
                            <div>
                                <input type='checkbox' value="hasCustom" checked={eModalFrequency.hasCustom === true} onChange={(e) => DueDateBreakdown({hasCustom: e.target.checked})}/>Always <input type='text' onChange={(e) => DueDateBreakdown({nValue: e.target.value})} placeholder='number'/> <select id="nUnit" name="nUnit" onChange={(e) => DueDateBreakdown({nUnit: e.target.value})}>
                                            <option>--None--</option>
                                            <option value='days'>Days</option>
                                            <option value='months'>Months</option>
                                            <option value='years'>Years</option>
                                        </select> <br />
                                </div>
                                </label>
                                <label>
                                Weekends:
                                <div onChange={(e) => DueDateBreakdown({countWeekends: e.target.value})}>
                                    <input type='radio' value='preWeekends' checked={eModalFrequency.countWeekends === 'preWeekends'}/>Due before weekends <br />
                                    <input type='radio' value='postWeekends' checked={eModalFrequency.countWeekends === 'postWeekends'}/>Due after weekends <br />
                                    <input type='radio' value='ignore' checked={eModalFrequency.countWeekends === 'ignore'} />Weekends don't change anything
                                </div>
                            </label>
                        </div>
                    )}
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
                    <label>
                        Add Total Debt value?
                        <input type='checkbox' checked={addETotal} name="addETotalValue" onChange={(e) => setAddETotal(e.target.checked)}/>
                    </label>
                    {addETotal && (
                        <div>
                            <label>
                                Total Debt Value: <br />
                                <input type="text" id="tDebtValue" name="tDebtValue" onChange={(e) => setETotalValue(e.target.value)} />
                            </label> <br />
                            <label>
                                APR% on expense (optional): <br />
                                <input type="text" id="tDebtAPR" name="tDebtAPR" onChange={(e) => setEAPRTotal(e.target.value)} />
                            </label>
                        </div>
                    )}
                    <label>Due Date:
                        <DatePicker 
                        selected={dueDateDate}
                        onChange={(date) => {setDueDateDate(date); DueDateBreakdown({day: date.getDate().toString()}); if (eModalFrequency.frequency === 'yearly'){DueDateBreakdown({month: date.getMonth().toString()})}}}
                        />
                    </label>
                    <input type='submit' value="Add Expense" onClick={event => submitExpenseModal(event)} className='ieModalButton'></input>
                    <input type='button' value="Cancel" onClick={iandEMToggle} className='ieModalButton cancelButton'></input>
                </form>
            )}
        </div>  
    )

}

export default EditModal;