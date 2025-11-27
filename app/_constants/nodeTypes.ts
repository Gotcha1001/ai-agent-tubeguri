import AgentNode from "../agent-builder/_customNodes/AgentNode";
import ApiNode from "../agent-builder/_customNodes/ApiNode";
import EndNode from "../agent-builder/_customNodes/EndNode";
import IfElseNode from "../agent-builder/_customNodes/IfElseNode";
import StartNode from "../agent-builder/_customNodes/StartNode";
import UserApprovalNode from "../agent-builder/_customNodes/UserApprovalNode";
import WhileNode from "../agent-builder/_customNodes/WhileNode";

export const nodeTypes = {
  StartNode: StartNode,
  AgentNode: AgentNode,
  EndNode: EndNode,
  IfElseNode: IfElseNode,
  WhileNode: WhileNode,
  UserApprovalNode: UserApprovalNode,
  ApiNode: ApiNode,
};
