```
# Business Rules Engine for Discounts

## Problem Summary
A discount module for an e-commerce platform that calculates the final payable amount based on business rules.  
Only one highest-priority discount is applied per order.

---

## Input Format
Order object contains:
- customerType (NEW, REGULAR, PREMIUM)  
- items [{ productId, category, price }]  
- orderTotal  
- dayOfWeek (MONDAY … SUNDAY)

---

## Business Rules
1. New customers get 10% discount  
2. Orders above ₹10,000 get flat ₹500 discount  
3. On Wednesdays, all orders get 5% discount  

Only one discount applies.

Priority order:
Rule 1 > Rule 2 > Rule 3

---

## Design Approach
- Implemented a pluggable, rule-based engine  
- Each discount is an independent rule  
- Every rule has:
  - priority  
  - applicability check  
  - discount logic  
- A central engine:
  - stores all rules  
  - sorts by priority  
  - applies the first matching rule  

---

## Why This Design
- Easy to add/remove discount campaigns  
- No modification required in existing rules  
- Priority conflicts handled cleanly  
- Business logic isolated from engine logic  

---

## Flow
Order → DiscountEngine → Sorted Rules → First applicable rule → Final amount

---

## Rules Implemented
- New customer → 10% off  
- Order above ₹10,000 → ₹500 off  
- Wednesday → 5% off  

---

## Tech Stack
- Node.js (plain JavaScript)

---

## How to Run

node discountEngine.js

---

## Extending the System
To add a new discount:
1. Create a new rule class  
2. Define priority, isApplicable(), and apply()  
3. Register it in DiscountEngine  

No changes needed in existing rules or engine.

---

## Output
Returns:
- originalAmount  
- finalAmount  
- discountApplied
```
