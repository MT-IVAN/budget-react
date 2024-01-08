import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/addBudgetModal";
import { useEffect, useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import AddExpensesModal from "./components/addExpenseModal";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpenseModalId, setViewExpenseModalId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false);
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setAddExpenseModalBudgetId(budgetId);
    setShowAddExpenseModal(true);
  }

  return (
    <>
      <Container className="mb-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => openAddExpenseModal()}
          >
            Add Expense
          </Button>
        </Stack>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            console.log("getting here");
            const currentAmount = getBudgetExpenses(budget.id).reduce(
              (total, acc) => total + acc.amount,
              0
            );
            return (
              <BudgetCard
                id={budget.id}
                name={budget.name}
                amount={currentAmount}
                max={budget.max}
                gray
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setViewExpenseModalId(budget.id)}
              ></BudgetCard>
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={() => openAddExpenseModal()}
            onViewExpenseClick={() =>
              setViewExpenseModalId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpensesModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudget={addExpenseModalBudgetId}
      />
      <ViewExpensesModal
        budgetId={viewExpenseModalId}
        handleClose={() => setViewExpenseModalId()}
      />
    </>
  );
}

export default App;
