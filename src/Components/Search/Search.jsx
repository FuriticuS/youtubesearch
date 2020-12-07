import React, {Component} from 'react';
import {block} from 'bem-cn';
import {Input} from 'antd';
import requestYouTube from '../apis/requestYouTube';
import List from "../../Img/List";
import Grid from "../../Img/Grid";
import { NavLink} from "react-router-dom";

import './search.scss';

const cn = block('search');

const {Search} = Input;

class SearchAnt extends Component {

    state = {
        videos: [],
        value: '',
        valueOld: '',
        totalResults: '',
        changed: false,
        top: '50%',
        minHeight: '79vh',
        flexDirection: 'row',
        activedR: '',
        activedL: ''
    }


    handleClickRow = () => {
        this.setState(state => ({
            top: '50%',
            flexDirection: 'row',
            activedR: 'activedR',
            activedL: ''
        }));
    }

    handleClickColumn = () => {
        this.setState(state => ({
            top: '151%',
            flexDirection: 'column',
            activedR: '',
            activedL: 'activedL'
        }));
    }

    handleSubmit = async (termFromSearchBar) => {
        const response = await requestYouTube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items,
            changed: true,
            value: termFromSearchBar,
            totalResults: response.data.pageInfo.totalResults,
            top: '50%',
            minHeight: '100vh',
            activedR: 'activedR'
        })

        console.log("this is response: ", response);
    }

    render() {
        return (
            <div className={cn()} style={{minHeight: `${this.state.minHeight}`}}>

                <div className="container" style={{top: `${this.state.top}`}}>
                    <h1>Поиск видео</h1>

                    <Search
                        placeholder="Что хотите посмотреть?"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={this.handleSubmit}
                    />

                    {
                        this.state.changed &&

                        <div className={cn("result")}>
                            <div className="top">
                                <p>Видео по запросу "
                                    <span className="result-name">{this.state.value}</span>"
                                    <span className="result-total">{this.state.totalResults}</span>
                                </p>

                                <div className="switch">

                                    <NavLink
                                        to='#'
                                        className={this.state.activedL}
                                        onClick={this.handleClickColumn}>
                                        <List/>
                                    </NavLink>

                                    <NavLink
                                        to='#'
                                        className={this.state.activedR}
                                        onClick={this.handleClickRow}>
                                        <Grid />
                                    </NavLink>

                                </div>
                            </div>

                            <div className={"items "+this.state.activedL} style={{flexDirection: `${this.state.flexDirection}`}}>
                                {this.state.videos.map((video, index) => {
                                    return (
                                        <div key={index} className="result-item">
                                            <img className='item-img' src={video.snippet.thumbnails.medium.url}
                                                 alt={video.snippet.description}/>
                                            <div className='item-text'>
                                                <div className='top-item-title'>{video.snippet.title}</div>
                                                <div className='top-item-description'>{video.snippet.description}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    }

                </div>

            </div>
        );
    }

};

export default SearchAnt;
