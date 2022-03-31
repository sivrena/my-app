import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  AdaptivityProvider,
  ConfigProvider,
  useAdaptivity,
  AppRoot,
  SplitLayout,
  SplitCol,
  ViewWidth,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  FormLayout,
  FormLayoutGroup,
  FormItem,
  Input,
  Radio,
  Button,
  NativeSelect,
  Banner,
  Textarea,
  Slider,
  CellButton
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

const App = (props) => {
  const { viewWidth } = useAdaptivity();

  //слайдеры, необязательные значения, число тестов
  const[showPatronym, setShowPatronym] = useState(false);
  const[showPatronym1, setShowPatronym1] = useState(false);
  const[showPatronym2, setShowPatronym2] = useState(false);  
  const[showPatronym3, setShowPatronym3] = useState(false);
  const[showPatronym4, setShowPatronym4] = useState(false);
  const[scaleValue, setScaleValue]=useState(0);
  const[minCount, setMinCountValue]=useState(0);
  const[maxCount, setMaxCountValue]=useState(0);
  const[testNumb, setTestNumb]=useState([1, 2, 3, 4, 5, 6, 7]);
  const[rhName, setRhName]=useState({
    default: "По умолчанию",
    classic: "Классический",
    user: ""
  });
  const[ohName, setOhName]=useState({
    default: "По умолчанию",
    psycho_defense: "Психологическая защита",
    cattell_poll: "Опросник Кеттела",
    big_five: "Большая пятерка",
    schwartz_poll: "Опросник Шварца",
    temperament: "Темперамент",
    leonhard_poll: "Опросник Леонгарда",
    user: ""
  });
  const[typeName, setTypeName]=useState({
    buttons: "Кнопки",
    checkboxes: "Чекбоксы",
    friends: "Друзья",
    forms: "Формы",
    radios: "Радио-кнопки",
    user: ""
  });

  //название теста, его идентификатор
  const[short_name, setShortName]=useState("");
  const[full_name, setFullName]=useState("");

  //параметры теста
  const[options, setOptions]=useState({
    is_available: false,
    position: -1,
    can_redo: false,
    result_handler: "default",
    output_handler: "default"
  });

  //оформление теста на клиенте
  const[decoration, setDecoration]=useState({
    description: "",
    instruction: ""
  })

  const delPhoto = () => {
    delete decoration.photo;
    setShowPatronym(false);
  }

  //вопросы теста
  const[questions, setQuestions]=useState([{
    q_id: 0,
    content: "",
    /*photo: [{
      url: "default",
      scale: 0
    }],*/
    is_available: true,
    type: "buttons",
    //min_count: 0,
    //max_count: 0,
    position: 0,
    answers: [{
      a_id: 0,
      content: "",
      is_available: true,
      position: 0,
      /*handler_info: [{
        factor: "",
        score: 0
      }]*/
    }]
  }])

  const[quNumber, setQuNumber]=useState(0);
  const[anNumber, setAnNumber]=useState(0);
  const[phNumber, setPhNumber]=useState(0);
  const[haNumber, setHaNumber]=useState(0);

  const[question, setQuestion]=useState("");
  const[type, setType]=useState("buttons");
  const newQuestion = () => {
    setQuNumber(quNumber+1);
    setQuestion("");
    setType("buttons");

    setShowPatronym1(false);
    setShowPatronym2(false);
    setShowPatronym3(false);
    setShowPatronym4(false);

    setPhNumber(0);
    setValue("");
    setScaleValue(0);

    setMinCountValue(0);
    setMaxCountValue(0);

    setAnNumber(0);
    setAnswer("");

    setHaNumber(0);
    setFactor("");
    setScore("");

    questions.push({
      q_id: quNumber + 1,
      content: "",
      is_available: true,
      type: "buttons",
      position: quNumber + 1,
      answers: [{
        a_id: 0,
        content: "",
        is_available: true,
        position: 0,
      }]
    });
  }

  const deleteQuestion = (id) => {
    let index = 0;

    for (let i=0; i<quNumber + 1; i++) {
      if (questions[i].q_id === id) {
        index = i;
    }}


    if (quNumber === 0) {

      questions[0] = {
        q_id: 0,
        content: "",
        is_available: true,
        type: "buttons",
        position: 0,
        answers: [{
          a_id: 0,
          content: "",
          is_available: true,
          position: 0,
        }]
      } 
      
      setAnNumber(0);
      setQuestion("");
      setShowPatronym1(false);
      setValue("");
      setScaleValue(0);
      setType("buttons");
      setShowPatronym2(false);
      setShowPatronym3(false);
      setMinCountValue(0);
      setMaxCountValue(0);
      setAnswer("");
      setShowPatronym4(false);
      setFactor("");
      setScore("");
     
    }

    else {
      questions.splice(index, 1);
      setQuNumber(quNumber-1);
      setAnNumber(0);
      
      for (let i=0; i<quNumber; i++) {
        questions[i].q_id = i;
        questions[i].position = i;
      }
    }
  }

  const addContent = (e) => {
    questions[quNumber].content = e.target.value; 
    setQuestion(e.target.value);
  }
  const addType = (e) => {
    questions[quNumber].type = e.target.value;
  }

  const countMin = (numb) => {
    questions[quNumber].min_count = numb;
    setMinCountValue(numb);
  }
  const delMin = () => {
    setShowPatronym2(false);
    setMinCountValue(0);
    delete questions[quNumber].min_count;
  }

  const countMax = (numb) => {
    questions[quNumber].max_count = numb;
    setMaxCountValue(numb);
  }
  const delMax = () => {
    setShowPatronym3(false);
    setMaxCountValue(0);
    delete questions[quNumber].max_count;
  }

  const [value, setValue]=useState("");
  const addPhotoUrl = (e) => {
    setValue(e.target.value);
    questions[quNumber].photo[phNumber].url = e.target.value;
  }
  const addPhotoScale = (numb) => {
    questions[quNumber].photo[phNumber].scale = numb;
    setScaleValue(numb);
  }
  const deletePhoto = () => {
    setShowPatronym1(false);
    setPhNumber(0);
    delete questions[quNumber].photo;
  }
  const newPhoto = () => {
    questions[quNumber].photo.push({url: "", scale: 0});
    setPhNumber(phNumber+1);
    setValue("");
    setScaleValue(0);
  }

  const [answer, setAnswer]=useState("");
  const addAnswer = (e) => {
    setAnswer(e.target.value);
    questions[quNumber].answers[anNumber].content = e.target.value;
  }
  const addHandler = () => {
    setShowPatronym4(true); 
    questions[quNumber].answers[anNumber].handler_info = [{factor: "", score: 0}];
  }
  const deleteHandler = () => {
    setShowPatronym4(false); 
    delete questions[quNumber].answers[anNumber].handler_info;
  }
  const [factor, setFactor]=useState("");
  const addFactor = (e) => {
    setFactor(e.target.value);
    questions[quNumber].answers[anNumber].handler_info[haNumber].factor = e.target.value;
  }
  const [score, setScore]=useState("");
  const addScore = (e) => {
    setScore(Number(e.target.value));
    questions[quNumber].answers[anNumber].handler_info[haNumber].score = Number(e.target.value);
  }
  const newFactor = () => {
    setFactor("");
    setScore("");
    setHaNumber(haNumber+1);
    questions[quNumber].answers[anNumber].handler_info.push({factor: "", score: 0});
  }

  const newAnswer = () => {
    setAnswer("");
    setFactor("");
    setScore(0);
    setShowPatronym4(false); 
    setAnNumber(anNumber+1);
    setHaNumber(0);
    questions[quNumber].answers.push({
      a_id: anNumber + 1,
      content: "default",
      is_available: true,
      position: anNumber + 1
    });
  }

  const postTest = () => {
    //проверка обязательных элементов, задача значений по умолчанию
    if (short_name === "")
      setShortName("default");
    if (full_name === "")
      setFullName("default");
    if (decoration.description === "")
      setDecoration({...decoration, description: "default"});
    if (decoration.instruction === "")
      setDecoration({...decoration, instruction: "default"});
    for (let i=0; i<quNumber+1; i++) {
      if (questions[i].content === "") {questions[i].content = "default";}
      for (let j=0; j<questions[i].answers.length; j++) {
        if (questions[i].answers[j].content === "") {questions[i].answers[j].content = "default";}
      }
    }

    //создание JSON с данными теста
    let test = JSON.stringify({});

    test = JSON.stringify({
      short_name: short_name,
      full_name: full_name,
      options: options,
      decoration: decoration,
      questions: questions
    });

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        
      if (xhr.readyState !== 4) {
        console.log('В процессе');
      }
      if ((xhr.readyState === 4) && (xhr.status === 200)) {
        console.log('Запрос завершён');
      }
    });

    xhr.onloadend = () => {
      if (xhr.status === 200) {
        setShowPatronym(false);
        setShowPatronym1(false);
        setShowPatronym2(false);
        setShowPatronym3(false);
        setShowPatronym4(false);
        setScaleValue(0);
        setMinCountValue(0);
        setMaxCountValue(0);
        setShortName("");
        setFullName("");
        setOptions({
          is_available: false,
          position: -1,
          can_redo: false,
          result_handler: "default",
          output_handler: "default"
        });
        setDecoration({
          description: "",
          instruction: ""
        });
        setQuestions([{
          q_id: 0,
          content: "",
          is_available: true,
          type: "buttons",
          position: 0,
          answers: [{
            a_id: 0,
            content: "",
            is_available: true,
            position: 0,
          }]
        }]);
        setQuNumber(0);
        setAnNumber(0);
        setPhNumber(0);
        setHaNumber(0);
        setQuestion("");
        setType("buttons");
        setAnswer("");
        setFactor("");
        setScore("");
      } 
      else {
        console.log('Ошибка ' + xhr.status);
      }
    };
  
    xhr.open('POST', '/person-test', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(test);
    
    //console.log(test);
  }



  return (
    <AppRoot>
      <View id="0" activePanel="add_test_panel">
        <Panel id="add_test_panel">

            <PanelHeader align="center">Добавить тест</PanelHeader>

            <Group>
              <FormLayout onSubmit={(e) => e.preventDefault()}>
                <FormLayoutGroup mode="vertical">
                  <FormItem top="Короткое имя теста">
                    <Input
                    type="text"
                    placeholder="big_five"
                    name="short_name"
                    value={short_name}
                    onChange={(e) => setShortName(e.target.value)}
                    />
                  </FormItem>
                  <FormItem top="Полное имя теста">
                    <Input
                    type="text"
                    placeholder="Большая пятерка"
                    name="full_name"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                    />
                  </FormItem>
                </FormLayoutGroup>
              </FormLayout>
            </Group>

            <Group>
              <FormLayout onSubmit={(e) => e.preventDefault()}>
                <FormLayoutGroup mode="vertical">

                <FormItem top="Позиция в списке тестов">
                    <NativeSelect 
                      type="number" 
                      name="position"
                      value={options.position}
                      onChange={(e) => setOptions({...options, [e.target.name]: Number(e.target.value)})}
                    >
                    {testNumb.map(Item =>
                      <option key={Item}
                        value={Item}
                      >
                        {Item}
                      </option>
                    )}
                      <option 
                        value="-1"
                      >
                        Последний
                      </option>
                    </NativeSelect>
                  </FormItem>

                  <FormItem top="Перемещение по тесту">
                    <Radio
                      name="can_redo"
                      value=""
                      defaultChecked
                      onClick={(e) => setOptions({...options, [e.target.name]: Boolean(e.target.value)})}
                    >
                      Возврат к предыдущим вопросам невозможен
                    </Radio>
                    <Radio 
                      name="can_redo" 
                      value="true"
                      onClick={(e) => setOptions({...options, [e.target.name]: Boolean(e.target.value)})}
                    >
                      Возврат к предыдущим вопросам возможен
                    </Radio>
                  </FormItem>

                  <FormLayoutGroup mode="horizontal">
                    <FormItem 
                    top="Обработчик результатов" 
                    value={options.result_handler} 
                    onChange={(e) => setOptions({...options, [e.target.name]: e.target.value})}
                    >
                      <NativeSelect
                        type="text"
                        name="result_handler"
                        
                      >
                        <option
                          value="default"
                        >
                          По умолчанию
                        </option>
                        <option
                          value="classic"
                        >
                          Классический
                        </option>
                      </NativeSelect>

                      <Input
                        type="text"
                        placeholder="Собственное значение..."
                        name="result_handler"
                        onChange={(e) => setRhName({...rhName, user: e.target.value})}
                      />
                    </FormItem>
                    <FormItem 
                    top="Серверный обработчик вывода"
                    value={options.output_handler} 
                    onChange={(e) => setOptions({...options, [e.target.name]: e.target.value})}
                    >
                      <NativeSelect
                        type="text"
                        name="output_handler"
                      >
                        <option
                          value="default"
                        >
                          По умолчанию
                        </option>
                        <option
                          value="psycho_defense"
                        >
                          Психологическая защита
                        </option>
                        <option
                          value="cattell_poll"
                        >
                          Опросник Кеттела
                        </option>
                        <option
                          value="big_five"
                        >
                          Большая пятерка
                        </option>
                        <option
                          value="schwartz_poll"
                        >
                          Опросник Шварца
                        </option>
                        <option
                          value="temperament"
                        >
                          Темперамент
                        </option>
                        <option
                          value="leonhard_poll"
                        >
                          Опросник Леонгарда
                        </option>
                      </NativeSelect>

                      <Input
                        type="text"
                        placeholder="Собственное значение..."
                        name="output_handler"
                        onChange={(e) => setOhName({...ohName, user: e.target.value})}
                      />
                    </FormItem>
                  </FormLayoutGroup>

                </FormLayoutGroup>
              </FormLayout>
            </Group>

            <Group>
              <FormLayout onSubmit={(e) => e.preventDefault()}>
                <FormLayoutGroup mode="vertical">

                <FormItem 
                top="Описание теста"
                value={decoration.description}
                
                >
                  <Textarea 
                  placeholder="В психологии «большая пятёрка» — ..." 
                  name="description"
                  onChange={(e) => setDecoration({...decoration, [e.target.name]: e.target.value})}
                  />
                </FormItem>

                <FormItem 
                top="Инструкция к тесту с markdown разметкой"
                value={decoration.instruction}
                
                >
                  <Textarea 
                  placeholder="Вам нужно будет *прочесть* парные высказывания..." 
                  name="instruction"
                  onChange={(e) => setDecoration({...decoration, [e.target.name]: e.target.value})}
                  />
                </FormItem>


                  {!showPatronym ? (
                    <FormItem>
                    <CellButton
                      onClick={() => setShowPatronym(true)}
                    >
                      Указать картинку к тесту
                    </CellButton>
                    </FormItem>
                  ) : (
                    <FormItem
                      removable
                      onRemove={(e) => delPhoto()}
                      top="Картинка к тесту"
                      bottom="Удалите этот пункт в случае отсутствия картинки."
                      value={decoration.photo} 
                    >
                      <Input
                        name="photo"
                        onChange={(e) => setDecoration({...decoration, [e.target.name]: e.target.value})}
                      />
                    </FormItem>
                  )}
                                
                </FormLayoutGroup>
              </FormLayout>
            </Group>

            <Group>
              <FormLayout onSubmit={(e) => e.preventDefault()}>
                <FormLayoutGroup mode="vertical">

                <FormItem 
                top="Вопрос"
                >
                  <Textarea 
                  placeholder="Мне нравится заниматься физкультурой..."
                  value={question} 
                  name="content"
                  onChange={(e) => addContent(e)}
                  />
                </FormItem>
                {!showPatronym1 ? (
                  <FormItem>
                    <CellButton
                      onClick={() => {setShowPatronym1(true); questions[quNumber].photo = [{url: "", scale: 0}];}}
                    >
                      Указать картинку/картинки к вопросу
                    </CellButton>
                    </FormItem>
                ) : (
                  <FormLayoutGroup mode="horizontal"
                    removable
                    onRemove={() => deletePhoto()}
                  >
                    <FormItem
                      top="Ссылка на картинку к вопросу"
                    >
                      <Input
                        type="text"
                        name="url"
                        value={value}
                        onChange={(e) => addPhotoUrl(e)}
                        defaultalue="default"
                      />
                    </FormItem>
                    <FormItem top="Процент масштабирования картинки">
                      <Slider
                        name="scale"
                        step={5}
                        min={0}
                        max={100}
                        value={scaleValue}
                        onChange={(scaleValue) => addPhotoScale(scaleValue)}
                      />
                      <FormItem>
                        <Input
                          value={String(scaleValue)}
                          onChange={(e) => addPhotoScale(Number(e.target.value))}
                          type="number"
                        />
                      </FormItem>
                    </FormItem>
                    <FormItem top="Нужно больше одной картинки?">
                      <Button size="l" stretched onClick={() => newPhoto()}>Добавить новую картинку</Button>
                    </FormItem>
                </FormLayoutGroup>
                )}
                <FormLayoutGroup mode="horizontal">
                  <FormItem 
                  top="Тип ответов на вопрос"
                  >
                    <NativeSelect
                      type="text" 
                      name="type"
                      value={type}
                      onChange={(e) => {addType(e); setType(e.target.value);}}
                    >
                      <option 
                        value="buttons"
                      >
                        Кнопки
                      </option>
                      <option 
                        value="checkboxes"
                      >
                        Чекбоксы
                      </option>
                      <option 
                        value="friends"
                      >
                        Друзья
                      </option>
                      <option 
                        value="forms"
                      >
                        Формы
                      </option>
                      <option 
                        value="radios"
                      >
                        Радио-кнопки
                      </option>
                    </NativeSelect>
                    <Input
                      type="text"
                      placeholder="Собственное значение..."
                      name="type"
                      onChange={(e) => {setTypeName({...typeName, user: e.target.value}); addType(e);}}
                      />
                  </FormItem>
                  {!showPatronym2 ? (
                    <FormItem>
                    <CellButton
                      onClick={() => setShowPatronym2(true)}
                    >
                      Указать минимальное число вопросов
                    </CellButton>
                    </FormItem>
                  ) : (
                    <FormItem
                      removable
                      onRemove={() => delMin()}
                      top="Минимальное число ответов на вопрос"
                    >
                      <Slider
                        name="min_count"
                        step={1}
                        min={0}
                        max={20}
                        value={minCount}
                        onChange={(minCount) => countMin(minCount)}
                      />
                      <FormItem>
                        <Input
                          value={String(minCount)}
                          onChange={(e) => countMin(Number(e.target.value))}
                          type="number"
                        />
                      </FormItem>
                    </FormItem>
                  )}
                  {!showPatronym3 ? (
                    <FormItem>
                    <CellButton
                      onClick={() => setShowPatronym3(true)}
                    >
                      Указать максимальное число вопросов
                    </CellButton>
                    </FormItem>
                  ) : (
                    <FormItem
                      removable
                      onRemove={() => delMax()}
                      top="Максимальное число ответов на вопрос"
                    >
                      <Slider
                        name="max_count"
                        step={1}
                        min={0}
                        max={20}
                        value={maxCount}
                        onChange={(maxCount) => countMax(maxCount)}
                      />
                      <FormItem>
                        <Input
                          value={String(maxCount)}
                          onChange={(e) => countMax(Number(e.target.value))}
                          type="number"
                        />
                      </FormItem>
                    </FormItem>
                  )}
                </FormLayoutGroup>

                <FormItem>
                  <Button size="l" stretched onClick={() => newQuestion()}>Добавить новый вопрос</Button>
                </FormItem>

                <FormItem top="Текст варианта ответа">
                  <Textarea
                    placeholder="Да"
                    value={answer} 
                    name="content"
                    onChange={(e) => addAnswer(e)}
                  />
                </FormItem>
                {!showPatronym4 ? (
                  <FormItem>
                    <CellButton
                      onClick={() => addHandler()}
                    >
                      Указать информацию для обработчика результатов
                    </CellButton>
                    </FormItem>
                ) : (
                  <FormLayoutGroup mode="horizontal"
                    removable
                    onRemove={() => deleteHandler()}
                    top="Информация для обработчика результатов"
                  >
                  <FormItem top="Фактор">
                    <Input
                      type="text"
                      placeholder="A"
                      name="factor"
                      value={factor}
                      onChange = {(e) => addFactor(e)}
                    />
                  </FormItem>
                  <FormItem top="Количество баллов по фактору за выбранный вариант">
                    <Input
                      type="text"
                      placeholder="0"
                      name="score"
                      value={score}
                      onChange={(e) => addScore(e)}
                    />
                  </FormItem>
                  <FormItem top="Нужно больше одной картинки?">
                    <Button size="l" stretched onClick={() => newFactor()}>Добавить другой фактор</Button>
                  </FormItem>
                </FormLayoutGroup>
                )}
                <FormItem>
                  <Button size="l" stretched onClick={() => newAnswer()}>Добавить новый ответ</Button>
                </FormItem>

                </FormLayoutGroup>
              </FormLayout>
            </Group>

            <Group>
              <FormLayout>
                <FormLayoutGroup mode="vertical">
                  
                  <Header>Ваш тест:</Header>

                  <Banner
                    size="medium"
                    header = {full_name}
                    subheader ={short_name}
                  />

                  <Banner
                    size="medium"
                    header = "Параметры теста"
                    subheader = {
                      <React.Fragment>
                        {(options.position === -1) ? (
                          <React.Fragment>
                            Позиция в списке тестов: <br /> Последний <br />
                          </React.Fragment>  
                        ):(
                          <React.Fragment>
                            Позиция в списке тестов: <br /> {options.position} <br />
                          </React.Fragment>
                        )}                    
                        <br />
                        {(Number(options.can_redo)) ? (
                          <React.Fragment>
                            Возможность перемещения по тесту: <br /> Возможно перемещение по вопросам теста <br />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            Возможность перемещения по тесту: <br /> Перемещение по вопросам теста невозможно <br />
                          </React.Fragment>
                        )}
                        <br />
                        Обработчик результатов:
                        <br /> 
                        {(rhName.user === '') ? (
                          <React.Fragment> {rhName[options.result_handler]} </React.Fragment>
                        ) : (
                          <React.Fragment> {options.result_handler} </React.Fragment>
                        )}
                        <br />
                        <br />
                        Серверный обработчик вывода: 
                        <br />
                        {(ohName.user === '') ? (
                          <React.Fragment> {ohName[options.output_handler]} </React.Fragment>
                        ) : (
                          <React.Fragment> {options.output_handler} </React.Fragment>
                        )}
                        <br />
                      </React.Fragment>
                    }
                  />

                  <Banner
                    size="medium"
                    header = "Оформление теста"
                    subheader = {
                      <React.Fragment>
                        Описание теста:                        
                        <br />
                        {decoration.description}
                        <br />
                        <br />
                        Инструкция к тесту: 
                        <br />
                        {decoration.instruction}
                        <br />
                        {!(decoration.photo) ? (
                          <React.Fragment></React.Fragment>
                        ) : (
                          <React.Fragment>
                            <br />
                            Картинка к тесту:
                            <br /> 
                            {decoration.photo}
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    }
                  />
                  
                  {questions.map(Item =>

                    <Banner key={Item.q_id}
                      size="medium"
                      header = {"Вопрос " + (Item.q_id+1)}
                      asideMode="dismiss"
                      onDismiss={() => deleteQuestion(Item.q_id)}
                      subheader = {
                        <React.Fragment>
                          Текст вопроса:                        
                          <br />
                          {Item.content}
                          <br />
                          {!(Item.photo) ? (                            
                            <React.Fragment></React.Fragment>
                          ) : (
                            <React.Fragment>
                              <br />
                              Картинки к вопросу:
                              <br />
                              {Item.photo.map(item =>
                                <React.Fragment>
                                Ссылка на картинку: {item.url}; процент масшатбирования: {item.scale}
                                <br />
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          )}
                          <br />
                          Тип ответов: 
                          <br />
                          {(typeName.user === '') ? (
                            <React.Fragment> {typeName[Item.type]} </React.Fragment>
                          ) : (
                            <React.Fragment> {typeName.user} </React.Fragment>
                          )}
                          <br />
                          {!(Item.min_count) ? (
                            <React.Fragment></React.Fragment>
                          ) : (
                            <React.Fragment>
                              <br />
                              Минимальное число ответов:
                              <br /> 
                              {Item.min_count}
                              <br />
                            </React.Fragment>
                          )}
                          {!(Item.max_count) ? (
                            <React.Fragment></React.Fragment>
                          ) : (
                            <React.Fragment>
                              <br />
                              Максимальное число ответов: 
                              <br /> 
                              {Item.max_count}
                              <br />
                            </React.Fragment>
                          )}
                          {Item.answers.map(item =>
                            <React.Fragment key={item.a_id}>
                              <br />
                              Вариант ответа {item.a_id + 1}:
                              <br />
                              {item.content}
                              <br />
                              {!(item.handler_info) ? (
                                <React.Fragment></React.Fragment>
                              ) : (
                                <React.Fragment>
                                  {item.handler_info.map(itemm =>
                                    <React.Fragment>
                                      Фактор: {itemm.factor}; количество баллов по фактору: {itemm.score}
                                      <br />
                                    </React.Fragment>
                                  )}
                                <br />
                                </React.Fragment> 
                              )}
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      }
                    />

                  )}

                </FormLayoutGroup>
              </FormLayout>
            </Group>
            
              <FormLayout>
                <FormLayoutGroup mode="vertical">
                  <FormItem>
                    <Button size="l" stretched onClick={() => postTest()}>Добавить тест</Button>
                  </FormItem>
                </FormLayoutGroup>
              </FormLayout>

        </Panel>
      </View>
    </AppRoot>
  );
};

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById("root")
);

export default App;