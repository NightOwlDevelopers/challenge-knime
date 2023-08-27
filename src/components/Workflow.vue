<script setup lang="ts">
import { Ref, computed, onMounted, ref, watch } from "vue";
import { WorkflowGraph } from "../types/dataTypes";
import {
  drawWorkflowInCanvas,
  getNodeIdByPointInside,
} from "../helpers/canvasHelper";
import { useStore } from "vuex";
import { UpdateNodePositionData } from "../store/modules/workflow";

const drawWorkflow = () => {
  const canvas = canvasRef.value;
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  canvas.onmousedown = handleMouseDown;
  canvas.onmouseup = handleMouseUp;
  canvas.onmousemove = handleMouseMove;

  drawWorkflowInCanvas({ context, canvas, workflow: workflowGraph.value });
};

const store = useStore();

onMounted(() => {
  store.dispatch("workflow/fetchWorkflow");
  drawWorkflow();
});

const workflowGraph = computed<WorkflowGraph>(
  () => store.getters["workflow/workflowGraph"]
);

const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);
const isDragging = ref(false);
const activeNodeId: Ref<number | null> = ref(null);
const dragStartingPoint: Ref<{ x: number; y: number } | null> = ref(null);

const handleMouseDown = (event: MouseEvent) => {
  event.preventDefault;
  if (canvasRef.value) {
    const nodeId = getNodeIdByPointInside({
      canvas: canvasRef.value,
      point: { x: event.clientX, y: event.clientY },
      nodes: workflowGraph.value.nodes,
    });
    if (nodeId) {
      isDragging.value = true;
      activeNodeId.value = nodeId;
      dragStartingPoint.value = { x: event.clientX, y: event.clientY };
    }
  }
};

const handleMouseUp = (event: MouseEvent) => {
  event.preventDefault;
  if (isDragging.value) {
    isDragging.value = false;
    activeNodeId.value = null;
    dragStartingPoint.value = null;
  }
};

const handleMouseMove = (event: MouseEvent) => {
  event.preventDefault;

  if (isDragging.value && activeNodeId.value && dragStartingPoint.value) {
    const activeGraphNode = workflowGraph.value.nodes.find(
      (node) => node.id === activeNodeId.value
    );

    if (!activeGraphNode?.data) {
      return;
    }

    const updateNodePositionData: UpdateNodePositionData = {
      id: activeNodeId.value,
      startingPointX: activeGraphNode.data.startingPointX,
      startingPointY: activeGraphNode.data.startingPointY,
    };

    const deltaX = event.clientX - dragStartingPoint.value.x;
    const deltaY = event.clientY - dragStartingPoint.value.y;
    updateNodePositionData.startingPointX =
      updateNodePositionData.startingPointX + deltaX;
    updateNodePositionData.startingPointY =
      updateNodePositionData.startingPointY + deltaY;
    dragStartingPoint.value = {
      x: event.clientX,
      y: event.clientY,
    };

    store.dispatch("workflow/updateNodeStartingPoint", updateNodePositionData);
  }
};

watch(store.state, drawWorkflow);
</script>

<template>
  <canvas ref="canvasRef" width="1200" height="1200"></canvas>
</template>

<style lang="scss" scoped>
canvas {
  border: 1px solid;
  position: absolute;
  top: 120px;
  left: 0px;
}
</style>
