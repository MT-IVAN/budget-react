import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard () {
    const { expenses, budgets } = useBudgets()
    const amount = expenses.reduce((total, acc) => total + acc.amount, 0)
    const max = budgets.reduce((total, acc) => total + acc.max, 0)

    if (amount === 0 ) return null

    return (
        <BudgetCard amount={amount} name='Total' gray max={max} hideButtons/>
    )
}