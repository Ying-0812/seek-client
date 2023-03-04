import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom'
import Issue from '../pages/Issue'
import AddIssue from '../pages/AddIssue'
import IssueDel from '../pages/IssueDel'
import Books from '../pages/Books'
import BookDel from '../pages/BookDel'
import Interviews from '../pages/Interviews'
import PersonalCenter from '../pages/PersonalCenter'
import SearchPage from '../components/SearchPage';

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/issue' element={<Issue></Issue>}></Route>
                <Route path='/AddIssue' element={<AddIssue></AddIssue>}></Route>
                <Route path='/IssueDel/:id' element={<IssueDel></IssueDel>}></Route>
                <Route path='/books' element={<Books></Books>}></Route>
                <Route path='/bookdel/:id' element={<BookDel></BookDel>}></Route>
                <Route path='/interviews' element={<Interviews></Interviews>}></Route>
                <Route path='/personal' element={<PersonalCenter></PersonalCenter>}></Route>
                <Route path='/search' element={<SearchPage></SearchPage>}></Route>
                <Route path='/' element={<Navigate replace to="/issue" />}></Route>
            </Routes>
        </div>
    );
}

export default RouterConfig;