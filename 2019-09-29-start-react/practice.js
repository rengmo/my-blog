// 在项目中可以使用 import { useState } from 'react'; 引入useState
// 因为在浏览器中会将import转换为require，于是会报错require is not defined，所以使用下面这个句子引入useState
let useState = React.useState; 
let useEffect = React.useEffect; 

function TodoItem (props) {
  const { content, setCompleteItems } = props;
  // 声明一个名为complete的state变量，可以通过setComplete改变变量的值，complete的初始值为false。
  const [ complete, setComplete ] = useState(false);
  let timer = null; // 定时器
  // useEffect的参数为一个函数，这个函数在组件挂载和更新时都会执行
  useEffect(() => {
    // 在useEffect中返回一个函数，这个函数会在组件清除的时候执行
    return () => {
      clearTimeout(timer)
    }
  });
  function changeTodoState (content, event) {
    let value = event.target.value;
    timer = setTimeout(() => {
      if (value) {
        // 通过setComplete改变complete的值
        setComplete(true);
        setCompleteItems(content); // 这里原本是this.props.setCompleteItems(content);
      }
    }, 200);
  }
  return (
    (!complete) && 
    <li className="todo-item" key={content.toString()}>
      {/* 如果不需要绑定参数，在{}中直接写this.changeTodoState就行，如果要传入参数，则需要使用bind方法 */}
      <input type="checkbox" onChange={changeTodoState.bind(this, content)}/>
      <span>{content}</span>
    </li>
  );
}

function TodoList (props) {
  const { list } = props;
  // 这里一开始定的completeItems的数据格式是数组，不止为何使用setCompleteItemsState的时候，completeItems的值也变了，但是组件中的completeItems仍然为空
  // 所以就换成字符串的格式了
  const [ completeItems, setCompleteItemsState ] = useState('');
  const setCompleteItems = (completedItem) => {
    // 使用useState设置completeItems的值为数组没有生效，于是换成使用字符串，还需要手动组合一下字符串
    let completeItemsText = completeItems;
    completeItemsText = completeItems + (completeItemsText ? '，' + completedItem : completedItem);
    setCompleteItemsState(completeItemsText);
  };
  let todoList = list.map((item) => <TodoItem content={item} setCompleteItems={setCompleteItems}/>);
  return (
    <div>
      <ul className="todo-list">
        {todoList}
      </ul>
      <p>已完成: {completeItems}</p>
   </div>
  )
}
let list = ['洗衣服', '买水果', '追剧'];
const todoList = <TodoList  list={list} />;
ReactDOM.render(
  todoList,
  document.getElementById('root')
);