"""Безопасный слой tools: агент предлагает действие, программа проверяет его."""

from dataclasses import dataclass
from typing import Any, Callable


ORDERS = {
    "A-100": {"status": "processing", "owner": "user-7"},
    "A-101": {"status": "shipped", "owner": "user-7"},
}


@dataclass(frozen=True)
class Tool:
    name: str
    handler: Callable[..., Any]
    changes_state: bool
    required_arguments: tuple[str, ...]


def lookup_order(order_id: str, user_id: str) -> dict:
    order = ORDERS.get(order_id)
    if not order or order["owner"] != user_id:
        return {"ok": False, "error": "order_not_found"}
    return {"ok": True, "order_id": order_id, "status": order["status"]}


def cancel_order(order_id: str, user_id: str) -> dict:
    order = ORDERS.get(order_id)
    if not order or order["owner"] != user_id:
        return {"ok": False, "error": "order_not_found"}
    if order["status"] != "processing":
        return {"ok": False, "error": "cannot_cancel_after_shipping"}
    order["status"] = "cancelled"
    return {"ok": True, "order_id": order_id, "status": "cancelled"}


TOOLS = {
    "lookup_order": Tool("lookup_order", lookup_order, False, ("order_id", "user_id")),
    "cancel_order": Tool("cancel_order", cancel_order, True, ("order_id", "user_id")),
}


def execute_tool_call(call: dict, confirmed: bool = False) -> dict:
    """Проверяет имя, аргументы и подтверждение независимо от решения модели."""
    tool = TOOLS.get(call.get("name"))
    if not tool:
        return {"ok": False, "error": "unknown_tool"}

    arguments = call.get("arguments") or {}
    missing = [name for name in tool.required_arguments if not arguments.get(name)]
    if missing:
        return {"ok": False, "error": "missing_arguments", "fields": missing}

    if tool.changes_state and not confirmed:
        return {"ok": False, "error": "confirmation_required", "proposed_call": call}

    allowed = {name: arguments[name] for name in tool.required_arguments}
    return tool.handler(**allowed)


def main() -> None:
    read_call = {
        "name": "lookup_order",
        "arguments": {"order_id": "A-100", "user_id": "user-7"},
    }
    write_call = {
        "name": "cancel_order",
        "arguments": {"order_id": "A-100", "user_id": "user-7"},
    }

    print("Read-only вызов:", execute_tool_call(read_call))
    print("Попытка без подтверждения:", execute_tool_call(write_call))
    print("После подтверждения:", execute_tool_call(write_call, confirmed=True))


if __name__ == "__main__":
    main()

