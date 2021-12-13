import React, { useState, useCallback } from 'react';
import calGroup from 'classification';
import Button from './button';


const reserve = [ '阿喵', '雪兒', '仙女', 'ｇａ', 'ＪＹ', '可樂', '博士', '小春', '神父' ];
const reserveLeng = reserve.length;


const getLocalPool = () => JSON.parse(localStorage.getItem('pool'));
const setLocalPool = (pool) => localStorage.setItem('pool', JSON.stringify(pool));


export default function App(props) {
  const [ pool, setPool ] = useState(() => {
    const _cache = getLocalPool();
    if (_cache) {
      return _cache;
    }
    setLocalPool(reserve);

    return reserve;
  });
  const [ joinList, setJoinList ] = useState([]);

  const [ blueList, setBlueList ] = useState([]);
  const [ redList, setRedList ] = useState([]);

  const [ showPool, setShowPool ] = useState(true);


  const handleOnSort = useCallback(() => {
    const { blue, red } = calGroup(joinList);
    setBlueList(blue);
    setRedList(red);
  }, [ joinList ]);

  const handleOnAddPool = useCallback(() => {
    const addpoolIpt = document.querySelector('#addpool');
    const addName = addpoolIpt.value;
    if (addName !== '') {
      setPool((pre) => {
        const newV = new Set(pre);
        newV.add(addName);
        setLocalPool([ ...newV ]);
        addpoolIpt.value = '';

        return [ ...newV ];
      });
    }
  }, []);


  return (
    <div style={{ 'width': 600, 'margin': '0 auto' }}>
      <div className='d-flex flex-column' style={{ 'height': 100 }}>
        <div className='d-flex' style={{ 'alignItems': 'center' }}>
          <span className='mr-2'>上場名單</span>
          <Button text='開始分組' onClick={handleOnSort} />
        </div>
        <div className='d-flex font-effect-fire-animation' style={{ 'color': 'grey' }}>
          {joinList.map((targetIdx) => <span key={targetIdx} className='mr-2'>{pool[targetIdx]}</span>)}
        </div>
      </div>
      <div className='d-flex flex-column'>
        <span>分組結果</span>
        <div className='d-flex' style={{ 'justifyContent': 'space-between' }}>
          <div className='d-flex flex-column'>
            <span className='font-effect-3d' style={{ 'background': 'blue', 'color': '#fff', 'height': 40, 'fontSize': 30, 'padding': '0 20px' }}>Blue</span>
            {blueList.map((id) => <span key={id} style={{ 'fontSize': 50 }}>{pool[id]}</span>)}
          </div>
          <div className='d-flex flex-column'>
            <span className='font-effect-3d' style={{ 'background': 'red', 'color': '#fff', 'height': 40, 'fontSize': 30, 'padding': '0 20px' }}>Red</span>
            {redList.map((id) => <span key={id} style={{ 'fontSize': 50 }}>{pool[id]}</span>)}
          </div>
        </div>
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex' style={{ 'alignItems': 'center' }}>
          <div style={{ 'userSelect': 'none', 'cursor': 'pointer' }} onClick={() => setShowPool((pre) => !pre)}>
            <span>選手名單</span>
            <span>{`${showPool ? '－' : '＋'}`}</span>
          </div>
          <input id='addpool' type='text' style={{ 'marginLeft': 'auto' }} />
          <Button text='新增' onClick={handleOnAddPool} />
        </div>

        {showPool && (
        <div style={{ 'overflow': 'auto', 'width': 600, 'maxHeight': 500, 'fontWeight': 600 }}>
          {pool.map((name, i) => <CheckBox key={name} id={i} label={name} setPool={setPool} setJoinList={setJoinList} />)}
        </div>
        )}
      </div>
    </div>
  );
}


function CheckBox(props) {
  const { id, label, setPool, setJoinList } = props;
  const onChange = useCallback((e) => {
    const { target } = e;

    const { checked } = target;
    setJoinList((pre) => {
      const newSet = new Set(pre);

      newSet[checked ? 'add' : 'delete'](id);

      return [ ...newSet ];
    });
  }, [ id ]);

  const handleOnRemove = useCallback(() => {
    setPool((pre) => {
      const newList = [ ...pre ];
      newList.splice(id, 1);
      setLocalPool(newList);

      return newList;
    });
    setJoinList((pre) => {
      const newSet = new Set(pre);
      newSet.delete(id);

      return [ ...newSet ];
    });
  }, [ id ]);

  return (
    <div className='chkbox'>
      <input id={`chk_${id}`} type='checkbox' onChange={onChange} />
      <label htmlFor={`chk_${id}`}>{label}</label>
      {id >= reserveLeng && <div className='removeIcon' onClick={handleOnRemove}>X</div>}
    </div>
  );
}
