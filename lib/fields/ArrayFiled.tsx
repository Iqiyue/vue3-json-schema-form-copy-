import { FieldPropsDefine } from "../types";
import { defineComponent, PropType } from "vue";
import { createUseStyles } from "vue-jss";
const useStyles = createUseStyles({
  container: {
    border: "1px solid #eee",
  },
  actions: {
    background: "#eee",
    padding: 10,
    textAlign: "right",
  },
  action: {
    "& + &": {
      marignRight: 10,
    },
  },
  content: {
    padding: 10,
  },
});
const ArrayItemWrapper = defineComponent({
  name: "ArrayItemWrapper",
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles();
    const handleAdd = () => props.onAdd(props.index);
    const handleDelete = () => props.onDelete(props.index);
    const handleUp = () => props.onUp(props.index);
    const handleDown = () => props.onDown(props.index);
    return () => {
      const classes = classesRef.value;
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              {" "}
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      );
    };
  },
});
/**
 * 单类型数组 single-type
 * {
 *   items: { type: string }
 * }
 *
 * 固定长度，多类型数组 fixed length & multi-type
 * {
 *   items: [
 *     { type: string },
 *     { type: number }
 *   ]
 * }
 *
 * 多选类型数组 multi-select
 * {
 *   items: { type: string, enum: ['1', '2']}
 * }
 */
export default defineComponent({
  name: "ArrayField",
  props: FieldPropsDefine,
  setup(props) {
    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr[index] = v;
      props.onChange(arr);
    };
    const handleAdd = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr.splice(index + 1, 0, undefined);
      props.onChange(arr);
    };
    const handleDelete = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr.splice(index, 1);
      props.onChange(arr);
    };
    const handleUp = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      const item = arr.splice(index, 1);
      arr.splice(index - 1, 0, item[0]);
      props.onChange(arr);
    };
    const handleDown = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      if (index === arr.length - 1) return;
      const item = arr.splice(index, 1);
      arr.splice(index + 1, 0, item[0]);
      props.onChange(arr);
    };

    return () => {
      const { schema, value, uiSchema } = props;
      const isMultiType = Array.isArray(schema.items);
      // as any 跳过类型检查
      const isSelect = schema.items && (schema.items as any).enum;
      return <h3>ArrayField</h3>;
    };
  },
});
