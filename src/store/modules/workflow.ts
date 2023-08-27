import { workflowMock } from "../../dataMock";
import {
  StartingPoint,
  WorkflowBlock,
  WorkflowGraph,
  WorkflowNode,
} from "../../types/dataTypes";
import { Commit } from "vuex";

export type UpdateNodePositionData = StartingPoint & { id: number };

type StateType = {
  workflowGraph: WorkflowGraph;
};

const state = {
  workflowGraph: { nodes: [], edges: [] },
};

const getters = {
  workflowGraph(state: StateType) {
    return state.workflowGraph;
  },
};

const actions = {
  fetchWorkflow({ commit }: { commit: Commit }) {
    // Here api should be fetched to get workflow. Setting hardcoded value instead
    commit("updateWorkflow", workflowMock);
  },
  updateNodeStartingPoint(
    { commit }: { commit: Commit },
    opts: UpdateNodePositionData
  ) {
    // Here node should be updated via api
    commit("updateNodeStartingPoint", opts);
  },
  addBlock(
    { commit, state }: { commit: Commit; state: StateType },
    workflowBlock: WorkflowBlock
  ) {
    // Logic for adding id and position should be on the backend
    // Logic is mocking backend. As long it's mock, some constants are hardcoded here
    let nodeId = 1;
    let startingPointY = 50;
    let startingPointX = 50;
    if (state.workflowGraph.nodes.length) {
      nodeId =
        Math.max(...state.workflowGraph.nodes.map((node) => node.id)) + 1;
      startingPointY = Math.max(
        ...state.workflowGraph.nodes.map((node) => node.data.startingPointY)
      );
      startingPointX =
        Math.max(
          ...state.workflowGraph.nodes
            .filter((node) => node.data.startingPointY === startingPointY)
            .map((node) => node.data.startingPointX)
        ) + 200;
    }
    if (startingPointX > 1000) {
      console.log(startingPointX, startingPointY);

      startingPointX = 50;
      startingPointY = startingPointY + 250;
    }

    commit("addNode", {
      id: nodeId,
      data: { ...workflowBlock, startingPointX, startingPointY },
    });
  },
};

const mutations = {
  updateWorkflow(state: StateType, workflowGraph: WorkflowGraph) {
    state.workflowGraph = workflowGraph;
  },
  updateNodeStartingPoint(state: StateType, opts: UpdateNodePositionData) {
    const nodeData = state.workflowGraph.nodes.find(
      (node) => node.id === opts.id
    )?.data;
    if (nodeData) {
      nodeData.startingPointX = opts.startingPointX;
      nodeData.startingPointY = opts.startingPointY;
    }
  },
  addNode(state: StateType, workflowNode: WorkflowNode) {
    console.log("workflow", state.workflowGraph.nodes.length);
    state.workflowGraph.nodes.push(workflowNode);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
