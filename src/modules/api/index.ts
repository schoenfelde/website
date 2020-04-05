import axios, { CancelTokenSource } from 'axios';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../redux/store';
import { useEffect, useState, useCallback } from 'react';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const useGetAPI = (config: {
    endpoint: string;
    callOnLoad: boolean;
}) => {
    const user = useSelector((state: ApplicationState) => state.session.user);
    const callOnLoad = config.callOnLoad;
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(!!config.callOnLoad);
    const [error, setError] = useState();
    const [callToken, setCallToken] = useState<CancelTokenSource>();
    const get = useCallback(async () => {
        const call = axios.CancelToken.source();
        setCallToken(call);
        const accessToken = await user.getAccessToken();
        return axios({
            method: 'get',
            url: `${BASE_URL}${config.endpoint}`,
            cancelToken: callToken?.token,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        //TODO FIX THIS
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config.endpoint, user]);

    useEffect(() => {
        if (callOnLoad) {
            setLoading(true);
            get()
                .then(response => {
                    setData(response.data);
                })
                .catch(setError)
                .finally(() => setLoading(false));
        }
    }, [callOnLoad, get]);

    return {
        get,
        loading,
        data,
        error,
    };
};

export const usePostAPI = (endpoint: string) => {
    const user = useSelector((state: ApplicationState) => state.session.user);

    const post = async (data: any) => {
        const accessToken = await user.getAccessToken();
        return axios({
            method: 'post',
            url: `${BASE_URL}${endpoint}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data,
        });
    };

    return post;
};
