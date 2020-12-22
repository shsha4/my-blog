import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            list: [],
            update: false
        }
    }

    componentDidMount() {
        this._getData();
    }

    _addData = async (e) => {
        const {name} = this.state;
        e.preventDefault();

        const res = await axios('/add/data', {
            method: 'POST',
            data: {'data': name},
            headers: new Headers()
        });

        if (res.data) {
            alert('데이터를 추가');
            return window.location.reload();
        }
    }

    _nameUpdate(e) {
        this.setState({name: e.target.value});
    }

    _getData = async () => {
        const res = await axios.get('/get/data');

        if (res.data[0] === undefined) {
            let cover = [];
            cover.push(res.data);

            this.setState({list: cover});
        } else {
            this.setState({list: res.data});
        }
    }

    _modify = async (e) => {
        const modify = prompt(e.name + '을 어떤 이름으로 변경할까요?');

        if (modify !== null) {
            const body = {
                name: modify,
                id: e.id
            }

            const res = await axios('/modify/data', {
                method: 'post',
                data: {'modify' : body},
                headers: new Headers()
            });

            if (res.data) {
                alert('데이터를 수정했습니다.');
                window.location.reload();
            }

        }
    }

    _delete = async(e) => {
        const remove = window.confirm(e.name + '을 삭제합니까?');

        if(remove) {
            const body = { id : e.id };
            const res = await axios('/delete/data', {
                method : 'post',
                data : { 'delete' : body},
                header : new Headers()
            });

            if(res.data) {
                alert('데이터를 삭제했습니다.');
                window.location.reload();
            }
        }
    }

    render() {
        const {list} = this.state;

        return (
            <div className='App'>
                <h3>Welcom to <u> minjun </u> Blog! </h3>
                <br/>
                <form method='post' onSubmit={this._addData}>
                    <input type="text" maxLength="10" onChange={(e) => this._nameUpdate(e)}/>
                    <input type="submit" value="Add"/>
                </form>
                <br/> <br/>
                <div style={{height: '250px', overflow: 'auto'}}>
                    <h4 style={{color: '#ababab'}}> Teachers List </h4>

                    <div style={{border: 'solid 1px black', width: '50%', marginLeft: '25%', textAlign: 'left'}}>
                        <div style={{display: 'grid', gridTemplateColumns: '32% 35% 30%', textAlign: 'center'}}>
                            <div> Number</div>
                            <div> Name</div>
                            <div> Other</div>
                        </div>
                    </div>

                    {list.length !== 0
                        ? list.map((el, key) => {
                            return (
                                <div key={key} style={{
                                    display: 'grid',
                                    lineHeight: '40px',
                                    gridTemplateColumns: '32% 35% 20% 0%',
                                    width: '50%',
                                    marginLeft: '25%'
                                }}>
                                    <div> {el.id} </div>
                                    <div> {el.name} </div>
                                    <div style={{color: '#ababab'}} onClick={() => this._modify(el)}> Modify</div>
                                    <div style={{color: '#ababab'}} onClick={() => this._delete(el)}> Delete</div>
                                </div>
                            )
                        })

                        : null}
                </div>
            </div>
        )
    }

}

export default App;