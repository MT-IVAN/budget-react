import { Form, Modal, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext'
export default function AddExpensesModal ({ show, handleClose, defaultBudget }) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addExpense, budgets } = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()
        addExpense({
            description: descriptionRef.current.value,
            amount: parseInt(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        })
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} type='text' required/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='amount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control ref={amountRef} type='number' required min={0} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='amount'>
                    <Form.Label>BudgetId</Form.Label>
                    <Form.Select defaultValue={defaultBudget} ref={budgetIdRef} required>
                        <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                        {budgets.map((budget) => (
                            <option key={budget.id} value={budget.id}>
                                {budget.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" type='submit'>Add</Button>
                    </div>
                </Form.Group>
            </Modal.Body>
            </Form>

        </Modal>
    )
}