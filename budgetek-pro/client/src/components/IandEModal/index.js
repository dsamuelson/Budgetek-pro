import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useMutation } from '@apollo/client';
import { ADD_BUDGET_EVENT } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux'

function IandEModal() {

    const dispatch = useDispatch();
    const modalStore = useSelector((state) => state.modalValue);
    const modalValue = modalStore.modalValue;
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [itemizeMTitle, setItemizeMTitle] = useState('')
    const [itemizeMValue, setItemizeMValue] = useState('')
    const [itemizeMPaid, setItemizeMPaid] = useState(false)
    const [itemizeMPresubmit, setItemizeMPresubmit] = useState([]);
    const [itemizeMSubmit, setItemizeMSubmit] = useState([]);

    const [eModalTitle, setEModalTitle] = useState('');
    const [eModalValue, setEModalValue] = useState('');
    const [eModalType, setEModalType] = useState('')
    const [eItemize, setEItemize] = useState(false);
    const [eModalFrequency, setEModalFrequency] = useState({});
    const [eModalCategory, setEModalCategory] = useState('');
    const [addETotal, setAddETotal] = useState(false)
    const [eTotalValue, setETotalValue] = useState('')
    const [eAPRTotal, setEAPRTotal] = useState('')
    const [eModalVital, setEModalVital] = useState(false);
    const [eventDate, setEventDate] = useState(new Date())

    const [ addEvent ] = useMutation(ADD_BUDGET_EVENT)

    const loggedIn = Auth.loggedIn();

    const resetIandEState = () => {

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
        setEventDate(new Date())
    }

    useEffect(() => {
        if (modalValue === "Income") {
            setEModalType('income')
        } else {
            setEModalType('expense')
        }
    }, [modalValue])

    useEffect(() => {
        if (itemizeMPresubmit.length){
            let oldValue = 0.00
                for (let i = 0; i < itemizeMPresubmit.length; i ++) {
                    if (!itemizeMPresubmit[i].iPaid){
                        oldValue += parseFloat(itemizeMPresubmit[i].iValue)
                    }
                }
                setEModalValue( parseFloat(oldValue).toFixed(2) )
            };
    },[itemizeMPresubmit, setItemizeMPresubmit])

    function iandEMToggle() {
            dispatch({
                type: "TOGGLE_MODAL",
                modalValue: 'None'
            })        
    }

    async function submitEventModal(e) {
        e.preventDefault();
        try {
            await addEvent({
                variables: {
                    eventTitle: eModalTitle,
                    eventValue: eModalValue.toString(),
                    eventType: eModalType,
                    eventFrequency: eModalFrequency,
                    vitalEvent: eModalVital,
                    eventCategory: eModalCategory,
                    totalEventValue: eTotalValue,
                    eventAPR: eAPRTotal.toString(),
                    eventDate: eventDate,
                    iouInfo: [...itemizeMSubmit]
                }
            });
        } catch (error) {
            console.log(error);
        }
        resetIandEState();
        dispatch({
            type: "TOGGLE_MODAL",
            modalValue: 'None'
        })

    }

    async function submitItemizeLI(e, target) {
        e.preventDefault();
        let tempId = Math.floor(Math.random() * parseInt(new Date().valueOf()))
        let iPaid = itemizeMPaid
        let iValue = itemizeMValue
        let iTitle = itemizeMTitle
        let forDisplayI = [{tempId, iPaid, iValue, iTitle}]
        let currentE = [{iouPaid: iPaid, iouValue: iValue, iouTitle: iTitle}]
        setItemizeMPresubmit((prev) => [...prev, ...forDisplayI])
        setItemizeMSubmit((prev) => [...prev, ...currentE]); 
    }

    async function eventDateBreakdown(options) {
        setEModalFrequency(eventDateOptions => ({
            ...eventDateOptions,
            ...options}))
    }

    return (
        <div className="ieModal">
            <h2>ADD {modalValue === 'Income'? 'INCOME' : 'EXPENSE'}</h2>
            {loggedIn && (
                <form className="eventForm">
                    <label>Event Title:
                        <input type='text' id="ETitle" name="ETitle" onChange={(e) => setEModalTitle(e.target.value)} className='formTextInput'/>
                    </label>
                    <label>Amount:
                        <input type='text' id='EValue' name="EValue" value={eModalValue} onChange={(e) => setEModalValue(e.target.value)} disabled={eItemize} className='formTextInput'/>
                    </label>
                    <label>
                    <input type='checkbox' id='Iitemize' onChange={(e) => setEItemize(e.target.checked)}/>Itemize this Event<br />
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
                        <button onClick={(e) => submitItemizeLI(e, eModalType)}>Add Item</button>
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
                            <div onChange={(e) => eventDateBreakdown({isSameDay: e.target.value})}>
                                <input type='radio' value="sameDay" checked={eModalFrequency.isSameDay === 'sameDay'}/>Always on the {`${eventDate.getDate()}`} Every Month <br />
                                <input type='radio' value='lastDay' checked={eModalFrequency.isSameDay === 'lastDay'}/>Always Last Day of the Month
                            </div>
                        </label>
                        <label>
                            Weekends
                            <div onChange={(e) => eventDateBreakdown({countWeekends: e.target.value})}>
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
                                <div onChange={(e) => eventDateBreakdown({isSameDay: e.target.value})}>
                                    <input type='radio' value="sameDay" checked={eModalFrequency.isSameDay === 'sameDay'}/>Always on {`${monthName[eventDate.getMonth()]} ${eventDate.getDate()}`} Every year <br />
                                    <input type='radio' value='lastDay' checked={eModalFrequency.isSameDay === 'lastDay'}/>Always Last Day of {`${monthName[eventDate.getMonth()]}`} <br />
                                    <input type='radio' value='firstDay' checked={eModalFrequency.isSameDay === 'firstDay'}/>Always First Day of {`${monthName[eventDate.getMonth()]}`}
                                </div>
                            </label>
                            <label>
                                Weekends:
                                <div onChange={(e) => eventDateBreakdown({countWeekends: e.target.value})}>
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
                                <input type='checkbox' value="hasCustom" checked={eModalFrequency.hasCustom === true} onChange={(e) => eventDateBreakdown({hasCustom: e.target.checked})}/>Always <input type='text' onChange={(e) => eventDateBreakdown({nValue: e.target.value})} placeholder='number'/> <select id="nUnit" name="nUnit" onChange={(e) => eventDateBreakdown({nUnit: e.target.value})}>
                                            <option>--None--</option>
                                            <option value='days'>Days</option>
                                            <option value='months'>Months</option>
                                            <option value='years'>Years</option>
                                        </select> <br />
                                </div>
                                </label>
                                <label>
                                Weekends:
                                <div onChange={(e) => eventDateBreakdown({countWeekends: e.target.value})}>
                                    <input type='radio' value='preWeekends' checked={eModalFrequency.countWeekends === 'preWeekends'}/>Due before weekends <br />
                                    <input type='radio' value='postWeekends' checked={eModalFrequency.countWeekends === 'postWeekends'}/>Due after weekends <br />
                                    <input type='radio' value='ignore' checked={eModalFrequency.countWeekends === 'ignore'} />Weekends don't change anything
                                </div>
                            </label>
                        </div>
                    )}
                    <label>{eModalType === 'expense' ? 'Vital Expense:' : 'Primary Income:'}
                        <input type='checkbox' id="EVital" name="EVital" onChange={(e) => setEModalVital(e.target.checked)}/>
                    </label>
                    <label>Main Category of {eModalType === 'expense' ? 'Expense:' : 'Income' }
                    <select id="ECategory" name="ECategory" onChange={(e) => setEModalCategory(e.target.value)}>
                    {eModalType === 'expense' ? (
                        <>
                            <option>--None--</option>
                            <option value='utilities'>Utilities</option>
                            <option value='commercial'>Commercial</option>
                            <option value='credit'>Credit</option>
                            <option value='subscription'>Subscription</option>
                            <option value='payments'>Payment Plan</option>
                            <option value='gift'>Gift</option>
                            <option value='other'>Other</option>
                        </>
                    ) : (
                        <>
                            <option>--None--</option>
                            <option value='job'>Job</option>
                            <option value='freelance'>Freelance</option>
                            <option value='payback'>Payback</option>
                            <option value='interest'>Interest</option>
                            <option value='gift'>Gift</option>
                            <option value='other'>Other</option>
                        </>
                    ) }
                            
                    </select>
                    </label>
                    <label>
                        Add Total Value?
                        <input type='checkbox' checked={addETotal} name="addETotalValue" onChange={(e) => setAddETotal(e.target.checked)}/>
                    </label>
                    {addETotal && (
                        <div>
                            <label>
                                Total Entry Value: <br />
                                <input type="text" id="tDebtValue" name="tDebtValue" onChange={(e) => setETotalValue(e.target.value)} />
                            </label> <br />
                            <label>
                                APR% on entry (optional): <br />
                                <input type="text" id="tDebtAPR" name="tDebtAPR" onChange={(e) => setEAPRTotal(e.target.value)} />
                            </label>
                        </div>
                    )}
                    <label>{eModalType === "expense" ? "Due Date:" : "Pay Day:"}
                        <DatePicker 
                        selected={eventDate}
                        onChange={(date) => {setEventDate(date); eventDateBreakdown({day: date.getDate().toString()}); if (eModalFrequency.frequency === 'yearly'){eventDateBreakdown({month: date.getMonth().toString()})}}}
                        />
                    </label>
                    <input type='submit' value={eModalType === "expense" ? "Add Expense" : "Add Income"} onClick={event => submitEventModal(event)} className='ieModalButton'></input>
                    <input type='button' value="Cancel" onClick={iandEMToggle} className='ieModalButton cancelButton'></input>
                </form>
            )}
        </div>  
    )
}

export default IandEModal;