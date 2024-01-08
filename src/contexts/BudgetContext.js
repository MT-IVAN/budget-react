import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hook/useLocalStorage";
import UncategorizedBudgetCard from "../components/UncategorizedBudgetCard";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [budgetsFromApi, setBudgetsFromApi] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/budgets").then((data) => {
      data.json().then((data) => {
        console.log(data.budgets);
        setBudgetsFromApi(data.budgets);
      });
    });
  }, []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addExpense({ description, amount, budgetId }) {
    console.log("here", { description, amount, budgetId });
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  async function getBudgets() {
    console.log("ivannn");
    try {
      const data = await fetch("http://localhost:4000/api/budgets");
      if (data.status) {
        console.log(data.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        budgetsFromApi,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        getBudgets,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
