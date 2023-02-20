# React.js TODO 트러불슛팅

1. API를 통해서 데이터를 받아온뒤 TODO 목록을 렌더링 하는 과정에서 무한루프 발생

* 원인
데이터를 받아온 뒤 렌더링을 하는 함수가 App.js(현재 최상위 Component)에 등록되있다.
해당 함수가 호출하면서 TODO목록의 상태를 담당하는 state가 변경이 되는데 (아래코드 변경)
```
const [todos, setTodos] = useState([
  ]);
```
위의 todos의 state가 변경되면서 App.js을 연속으로 렌더링하고 있었다.

```
import React, {useState, useEffect}from "react";
```

useState함수는 react에서 제공하는 모듈?에서 사용한 것인데 여기에 상태변경시 
추가적으로 렌더링이되도록 만들어진 것 같다

* 해결책
..

2. url의 pathvarible로 id(Api에서는 Long타입) 전달시 오류 발생

* 해결책
```
const response = await axios.delete(`http://localhost:8080/plan/${parseInt(id)}`);
```
위와 같이 ${parseInt(변수명)} 을통해 정수형으로 변환

