# OFA Sales Workflow: Lead Status Automation

This document outlines the automated task management system integrated into Mireia's Sales Console. The goal is to ensure a proactive sales process where every lead has a clear "next step" without manual intervention.

## 🔄 Status-to-Task Mapping

When a lead's status is updated in the CRM, the system automatically generates specific tasks for **Mireia**:

| Lead Status | Triggered Task | Objective |
| :--- | :--- | :--- |
| **NEW** | 🟢 Primer contacto / Cualificación | Validar si el lead es B2B y encaja con Elia Web. |
| **CONTACTED** | 🔵 Seguimiento de interés | Persuadir para agendar una demo tras el primer contacto. |
| **INTERESTED** | 📅 Agendar reunión / Demo | Fijar fecha y hora en el calendario. |
| **MEETING_SCHEDULED** | 🛠️ Preparar Demo personalizada | Configurar un caso de uso real para el cliente. |
| **DEMO_DONE** | 📝 Enviar propuesta comercial | Mandar presupuesto y términos del servicio. |
| **PROPOSAL_SENT** | ⏳ Seguimiento de cierre | Resolver dudas finales y conseguir el "sí". |
| **WON** | 🎉 Onboarding inicial | Proceso de bienvenida al ecosistema OFA. |
| **LOST** | 📁 Archivar / Análisis | Entender por qué se perdió para mejorar el script. |

## 🛠️ Governance & Routing

- **Default Owner**: Mireia (All sales-related tasks).
- **Incidence Routing**: Tasks marked as `INCIDENCE` (technical failures, bugs) are automatically visible in the **Ops Dashboard**.
- **Automation Logic**:
  - Setting a new status **archives** previous tasks related to that lead.
  - Generates the **next logical task** in the funnel.

## 💻 Technical Implementation

- **Database**: Supabase table `tasks`.
- **Trigger**: `handleStatusChangeTasks(leadId, newStatus)` function in the Sales Console.
- **UI**: Dedicated "Tasks" module in Mireia's Dashboard and the Hub.

---
*OFA Operating System - V1.5 Implementation*
