import React, { useState } from 'react';
import { App } from "../App";
import { getBasicAuthTokenWithUser } from "../../lib/edge/utils";

const LoginFormComponent = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleLoginForm = (evt: any) => {
        evt.preventDefault();

        const errors = {...validateCredentials(credentials)};

        setErrors(errors => (errors));

        if ('username' in errors || 'password' in errors) {
            return;
        }

        location.href = '/?token=' + getBasicAuthTokenWithUser(credentials.username, credentials.password);

    };

    const validateCredentials = (credentials: { username: string, password: string }) => {
        let errors = {};

        if (credentials.username === '') {
            errors = Object.assign(errors, {
                username: 'This field is required',
            });
        }

        if (credentials.password === '') {
            errors = Object.assign(errors, {
                password: 'This field is required',
            });
        }

        return errors;
    }

    const handleInputChange = (evt: any) => {
        evt.persist()
        setCredentials(credentials => ({...credentials, [evt.target.name]: evt.target.value}));
    }

    return (
        <App title="Create your own Pocket Aparavi Searcher">
            <main className="flex h-screen w-1/2">
                <section className="flex items-center w-full bg-re">
                    <form className="flex flex-col w-full bg-gray-800 p-12" onSubmit={handleLoginForm}>
                        <section className="items-center w-1/2">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAACFCAMAAAD8QbmLAAAB0VBMVEUAAAD////////////////////////////rlS3////////3jx////////////////////////7////////////////ziQP////////3jh7////////////////////////////////////////////////////////////////////////////////////3jx/////////////3jR7////////////////////3jx7////////////////////////////////////////////////////////////////////////////////////////////////////////////7jx33kB3////////////////////4jiD////3iB3////////3jx3////////////////////3jx7pgRr3jx/3jhr////3jQX4kSX3jx73jh/3jh/3kCT////////4kCP////3kB75gBr3jx7+9O72jR797eX95933kB74kB/70r76w6b4kCD3lj/6rHz7r37////3jh/3jx/7kR//liD/lCD/mSD4kB/3hQD4ky/3kSj9kx/8zrb83s//nSz7tov4qXP4oF76vp3/kAD8iQD3l0JJCnxNAAAAhXRSTlMAA/v8BQH++QQKk/3e1eDP9gaK2qGCArQo/A5yx8K48Mzn0h4iQxiwaT8zJsV6O/rb191D6wv4qy/aGwfkXgi8nG5LZCwVjVHAplT06XxGOBB2kFrtDPxh8smjl2hOJxKEbVZ/SPO3nQn16on9HGPgQLOfh1zcqhDM/jb+/oZJvZ6RfmlDN1+BKgAAG0NJREFUeNrs2ctrE1EUgPE7j2Qil0brIjjSaHzgQgciKAVdqCsXiiiii6IUn1gDVQsBQ8HlyeS1yJ/spIZM09gyl057S+b7LWYxzOw+zpnLqLxU1HZHd3U3M63Dzo/Je0AuAW6OxrprIh70O7uqUlNAHgF+74VdEzrUfd1WBAgrASZ0szdos4VhJ8BE3Bw3NykQtgJMChzuKFVSgIUAE2Ec7zICYSnARHP4hwBhMcD+DisY9gIMB50KBcJagHrc2mYHQ6mSM1M6jJMq5TUBR5pTCBzfOf4EjJthBvpggL1fBFhwjr93XfX9vfF31JhMLf4L7g+yGIdzg1KPRgRYcEl+l5+9vtK4fr7R2NhYm4jq9XpUj6IouU5Eawc0Ht9SznyAnQdH+jnVGsyt6pAAi85X5z5XxZR3Mwlwv9rWvLf/8Xui3dpfoGYFF5yvXq6IlN3AnQncYN70TvrMuty/kQZo6NuQAJH298WVwCuLEU+uLgRYy2ZLfeyHmkMIpv3dDiSQlGGA5ipJgJoAMfVoRdbl9APkEIJ/XkggZYsB6lHvHgEW16uquHL6E7A7o2MCLLJP4pUJENa8k0AIENZEBAib7opHgLCnSoCwZzHAspeJK28IEPkFaO4rAeIEAnQvZPLcu0aAyD1AV548vJTNHV8pAkS+AQbyQWVGgMg/wKdq1cmGAHECAV5UpmWZB/ieAEGAOBMIEEYIEEuFAGGEALFUCBBGCBBLhQBhhACxVCwFqAkQTEDYR4AwQoBYKnwD4i97d4yCMBBEYXgG9lX2gZzCGwlWdmJlaSmopRe2CZIRNswmIROz7+sDD/Zn0yVFNhIgb0DiDUgrwACpyBYCPDNAYoC0CjEBtnd+oJLiAnzue9odA6xYRIDH9+PVd2OA9YoI8HI9GQcGWK/lAxTIr0aoVgEBStNBR8bR9OXfDB0GLLJDDdeSuXdpslTckH0UaiBzAogNUBpLxlCzM0FmAi07DEmZVdM5lrh3wfNmcsLk/wIjJQwE+A8+1J1bTxpRFIXXnnNmJpBabGzTptXWqoDUlKhRJCpeUPFC1apNrDWmxl5e+tbEn7D+d0cGZQ4qbNukCd+LJDBnlvt87H0IDwiQ29+7OF5bq2xm11NQx7YLSxGpVGo24uUNs7OppSdWnDpp8H1Iee979ezsrPq9MK/N8WQpThHFaORwgjhJYNvk0edaz1Y3NzejXNmNO3K9KxQLLYrZefha/5aKhWLy0rK+a7QEtj0toEBqM63Yjw50Oy/49rhvKmJgYHLycnr60Q3TkwNTfSOZk6386e7O+lLDQV0z2BnxeM2blY8QxUWSb8ZwcsRBLgfiJEPPf58fFzdiB//Cv51MyGs+vAek7fk8XfLa1mZRoUstXlywNJcZGrxhqG8N4kxuYHR8+6Qvk39fvrbxUU8K6ANfGGGuCBiRhu8rxivmqKDUt3LxVTVPBa94RXAFIwZTEIWAU1Sy+Pqg/BdHDMF4HOs62JwPcS2qMknA8AVEWfstGufKddj4prNv6fAL1pF+bCVsWBbxvABIzwpoUaEJTRBjooe8gNUI+Jv9Xoxp/XWJjV5Ml7u3Hot9smSCJsYr8ZdKwGGWnFve/dgYRnhblQXAPqw+L7wol7nJFbIGadPohGFgrglKPIfo1t4PaFqEnIP4sYCpqeT/1c9vkOQdj/s5c1idyI0VdqcYqQbpUQEFGGZIJ/jIE4hCwC/02IWm0fSeTgC2y6CbY4kJPH7IQboLmInLrogShiT7Kg9rghZptz6GZh3Wfcm4UwrDy5fKY8wpvWREVmHRFHAg+VTIZ5BErXbJ8xxi7PGnRlfuTQEtsmTgbhR3YBUCPqVHDYEJyfpBZwMF62GbSSFXYTUCetTSeDcsv4AIlAg23t7KVYO99RrPqeAR7MPX9pix8LsLaHHE/mqiHY5N8RB+bwroY5shHTy+hu+rBNRvPLk832lTLGoMGbg5Rix8lYB6As+wtAb9J32s0gRMYrj4FeKaVKMXJJMv457knTqn13rHCVKT9wkoGP3MM5QPViMqRUEKY29Z7c0RLJio09DB0LyD1QqoV3CxDNuhGSzStA9NbsIqBdQThM0zkwaBvbV+YLjWPoPLIY1TwbJiiLT9upvhTA6iETDNGjDOmKFRpHDBwd4U0OLcbTxx9DRELaB+3+tF2I6Npi2Hx5+ArxVQj2d4qjTQYocmoEvIwbZcgjzDtikt3dcukEGiN/MUAnQbwYJcvZ4DKszvZ/cqI8zHKu/1ooCCl3FqB6M4/msFdCry476+II5HbitWfwjRYzzWtN9oLDfNcltztr0FVmNP3SndmbYKGpp9WHTtgBZHXEEKFR4iomzqo1jAGtO9KKBFxSmcc/xXC6g38HHOWdfZQKf/Oa1Y2wH1GMNjWE19iryjQCG33VwCGU7ECOh1X18w/ylpTBgfHLsKKEjzoiFgGhG5sJ7DAiY4/H8EFCtJrOAf8IEhhryFx4zA1wqop3TPTPX95AhzTkXzf8g7154moiAMv7N7zm4goAIajHhDykWrRAwIEQQUEEUpgiSKhmDk8sVvEn/C/G9lEWdnp122bIKpnA9qm1JnT5+dyztzCqg8gHYFfOV6gSxNSrSMXftVq8SEqgy5BfhThfcgFYFFf80NwR7o5QcJgFdvDFRG5/hqEsn67/wjD+hLOcBRpcFoQapZABOdNjqRbOuXoMq12iTectIH1xyAUbJEFW5gS8y98L5oiWavYxeUp6iEzKOnWe7STpMD7pkAFQLwFlcxiwWOmN+GfPAeRJju5PMBcKhaSa/qEkqsI4ji+g5iGN43AaBVfY+6D3Vcx2Y9l+awIaWQUWKoGIC5toTmyYj34E7dn6+N9udnQou6BGWHVBQNlsMeh6oEWYVDIQBv8xTa8JHH5nuZnwMEwsTM/jkA6IFh3vwka5N/gErwV7kjNmtQ4kVQUwBGbFcQq2dteWjdR3NKjC1Cokb5Z2gskXSgYIkmS6Rm48SLFnKko3vIdyog4NQc0BO+8PJJEVLjJxUQHCp8+XwAnGO9DuD92SPwqtJPlfXfmwMw5P6V2l5t8GjVXi5/eNE92RkfMZif1dkEykZK+OIeMOTOvb0jM+6Pjq6tjY7eH3y58ryv/eEVsSSt1dEp+/PR2KUqhrw0NuCRfOG9sq9LkM8g5HtAKRzbEwC/wKEvSTaTyvh8ADzgOJQlmUzTy16kVfubAvAxMmt6cWSOs3miyepMCWmVGCoOYMCvUW9Vr41n77VYYl6OUKzsMjleTiEfiFhY4OaPmO/DFQKQMBBv7gAfuB0OeHi8oXP88nwAvK0zjTIAOnxTN3iU3g9R+4sC2LGDLjNbXuuUbRZCfF42JP8WJaYJAB96EjNStgzMZbxZbC2xQrGKqpnfxguyUqbazMG8zs9spwJMVc25AILwg3eBBZ6Hd6gxTwF7fM+1GoBZkTViVjfwFuCbAfDJDXj9CnIebb0cZBSMCggN2wiR2KFidnEA65lN5IBJDpqR273H5+z+qJxtAJTXzAlUUDVwL3OoNJjnita8VpxDNeZBLPevw3vg1btDDHXwCloNQIc11QniOEg9DOUGLg4gmVdNa7Eh8Qwr2di1eIXDNHHjHKY/mnW4sgAC6EJbp7bERFFTon1KG8L9/emHAa9nXeCQvEAjalcmYwz4kuxegWmYER4fBaYdJQtDN/kHWg5Awrzeg41ejrXa731JAIFpPAhZx65r2Q+um4MonZpd47igEiNVsAXQErgsWYbxOnY57Io2FHHA6yprC7hzFmTFJI2oa/Tei081zYdwKAqgB7qZ+/7+wPYlnusCtRiAhIFN5Xh4QPXdQ35bBZUGUOQGKfeUyYSdGQ7SdlSqrF3gMlx5DwgC3eNAAZhXhRAmetT+hAOVSJ6IIjM5TpgK7HhfAwAPOVB7rfoy+SEYIKCPuWN1bejG0uLITeb5aVCreUCHde14buP9DIf6ml05AG22YwUMh4WsHZKbihJTHkA4fNdTew3qG+n5h2m7hoHbHOeMTXpAxZAolH6SgbtD4zUJQhEPKAQ+GGbmp+P7zHx3GaBWC8FShklqhm6LFMp7wIE7mustgk9f0k2O03Z8g3z0aiamPIDbEoOlSsgv0QSmbSSqQSR2RWKX/Q8sVxZuuegaXDEAZfsx9ai3Z6bjVvdg8rDVAMwMugXc0wYl5keSI5UBUJNuA1OiI6TteDyBpAGhPVV5AKXakddOwvu8Ei1MvXZsFpjQYVE8qJ1etTMLsrzxpXepqAcUA5M/JqaTvzxaDUDvj/dAUuxdOAkhaqKjLIB67jfQZ54Ib7Ib7RwOJf0XvaQsgIRnUl/bhrc9LxTr6QNHuGYnmDUUfRxwpH8KFm5dmEWhNE2KAwjvSA7+txyADmshh/peJUnXrNpfHkDrAe28SXg0JUWZA0pRqGdobBV8VgDfgHxuiab3h3BdudBYujoZJUb8Zluj2QvVxVwCAcWLEHEj+rthWghAORAomgsIs2P62XlQCQAlLsWNcsDEqeisKbmgYcMslQbQCT/SzChSokWJXXTc7w3yTk2RoGUqeF33h+k334BDAQD//bdjlQAw1xmEyYy5NCiVlFoCQBl1MR0wmTfRpdB2Ykci2ekKwJUMwfZdg8ZlPqFLlWgh78GdVBlR41kdh6mQw8zUobVjQQeaYKoegD3/M4AOfTYLFvFfnn8EVwpAGXrVTi59JICjlLib5IfWFQ+DUB7AdtX/t2P5VjvSLjiZ+wz09sMoMWpXni7C2TF0KzNdLAA9ulKabCRJFuGzBnNsGlQWwFcZIXoDlP4sxA4BPnHF6TIknoIrGYIdlt7pL2LhNfWmRtGz7UCHRxzb45fWy4o93+HqnTPJev2LBaDc4Jky02FQ9k8atyUAdJLNS0VBet7EDmUSqqoPm5xiK+cBidCe+QKNS+r7t0yZalIRCRHmbhJ73D1tT4dsi6TfptV4sQD0Hgf66k7Gxz38FsfZseESADpgmO2QQ+o94kyXru4XNgTcvwMqASA54CNnPqDJvGAtbeDELrKnlGwBa5MbOzpNGEo54uhPx/hiAWhucIlFMpys1P6zAtgFHMr7qY9M+RPDpkMtUzCMwBULwXQ8D0h/1t+BwD7Nnzk5aRgRSLRdemrtheFr3B62NFNbZtzsQlXBIhboutTen4na3wSA3lOy/O9F5Aho5yhsdNzJYVUcjW4IkPFsNz382Seiu2pzwp+RkW2JJoxo4cjL9LYcYCUrcDVsJBKwlU57j6PPxfKAv8q7yl4ngig6u9POoo8S3N3dHi7BggbX4AQIHtydCe7Or2U7tJzePbA7y5YXkh6+8Ky9r+/0ztUzIBmKCT3x4uP1Q3joRcA5ijB1sOMfzUBh3kSkQqjrggTcLmUPKHZC4qWUqZvmrZw0etSCsWMXjJo0ccyRQcu6Y6BZxB1pejDsfbnZobHAyscL3sJSjUx6/So/W8sDxq+hpM6Nx0p1EpqJtg6wIpuAnetfqRm0YN04m1zECBH5i5Y8HUbUtkBjnwjIy3k6qhwbtn32hg2zh60Pf34eC3pcIOGhBdglXSXrGUCPFwG2DBMXNYaJCHsx/FNuLQ+YPN2MfvfqYV/VqS9NgeCMySagsZU1S9esGTJ58J49saTx0nHjBs/GUpzcBII+LfVdxLysbAhX0NjPqYxgdBga+Rnkr9nTysKucmyX5FeIBVYx5kFaWjwbZIxxQ4WtRcDE0JCx+tO3D9dvxk6Q/BKG2jz3glkOEkBVgudNuPPM2lHQvU0noDFawvxWdaYbajCpMg3md3ZpkqvM3jdCi8/KIZugtQiYbLQa+/7VtGnPut7ppDp1ou4YVSuYgKBI5BDGiKrQKfvcXA+LRAGF1fNCpNnFtWFCK0JKStFCQ/wRA4whH7FAgD5y8p0ViDKhsZGrvLcWAROD48baj69eP5n28sX8Wc4JOsnA0EiRhFKTxIkwjo/DiE4qbpk6IH0pTEBt/jxfEyQaJiHsokoVzepQmIjYAsvDyQp3yxFwtXSAt16fefPkyc5pz54+2FGNBHloZHVBAoJ/3eHE4q4Wpds9G6/E6olknTaKi+kDRtYe5ZcNdTq5ezSiahcQ27UAdiWqRwhfQ9osrSuxRwlqxna0UhacHE4x9l3sAGM4J3g3doLuVZJpHMKlIgRstxtG16jMff3IXlKE0/gODhLZA/rrVQ9SnhOuptrMZbvEW1jKHCG65UpCoCZVOOxtLQ+YKMQbG32OHWAM5wSfn7imyj3Vck7jmiHRO8Kd5cgVRSpkV0zaNFFg06QV1hryF8SXvGbYEcshk59Zg7HbRq3sL7By1LYGuwxHyVxJGB7bWd/0TPr01iJgoMpybSFOQRz/HAZ0fXH+slJ9UYiFJHJBAobajnT+Dyo3MhLQkdEJmEiztlvOI5g18u3eseBxApg5hV3rK4T12hoqKZLoCfUY3e0zYXLpprUICAmdxhQkRt0JPn929axSW6w21AsteE1D785C/26izR+7oW+fl4AoFa0ZQxeWcA3GExwlM30gfeV4aeQCVvXTrRQDJuM7Y26dcScwKNj1xanLajMSVEgiF7qopm2bEi1R3D8EWxi2Duwzlf/+CDZG76mu0AYeKRqgNSNVSgzaV3LOLLk3HDmZ1dbygKXEuo+x7745Bwh0nfb8xYVriQ3h9ehC5CSgcU2I7Yc2q3LAMyP+wIpFlkRvCFAfcBx2GNNSNF9wlMzSn5i0DdTKUC46jW5BAq6WCW7bo1Mfdu6UFJy288Op+9omtieCbI3ohD/TOozck105ugB/dx418Ad+3fReMGCkp9o9UfXMStFCmxsRZnWo5QvfXXLZs9yLL7cWAXkfq4s6e/XZ82ldk07w621Z6pqZjFaYgEYL1J+lbe26OTj2uCHgD97fYQIa297WAC0ZGGVITscsGp7DLo6SuZGIoRm5b2/0T0nK1iIgiviYVVPq8qkXXRNO8PWrL9YYaqHl6wVXRgxfu2XCZtwSTe1oL7DEdPpA6pyBm2s4GMDP4o9Syk7R/MFRMiYtaN90F6zB2n8rJSEBDdwPrRaeFTvBN2e+37CGZlZTx7Haxjdgxbb9E/qvCrDBn9KO9gUar/4DqUsxUZOlegidZ39wlMxXAGGYZ42w1NVgWssDujl3uhql3Mk5wZ07pQt8Zw11IYiAUhIZwHeVgjLbgXZ0PhiS/mYCDqkyvoaFatIx+URRVQMnSL8yNicwq8MK+6ZRRWG0tZrmgv4lAVdDM7lZCAp6QNRgUIcSThAE/BRaQ0NxaQQcvjAhzixkI1iaIjegHJxOQFXmmCNdcxpSmbntYj7hGkh5QvTobTXldf+UgH1U04FKkjcBWZoC3uRQzZv07USR4JtX71kSOZ2A5dzt6PzQmKNKIyDrUOEBxHwjp2g2N1hulVVvWGL6GPpC/yYG1Hb46i5Nx1Y8SX4CQguXJFB/OsG307rCBX5MvMW3ZBEQki8574DWYSrkGQpNtVQCQtAbBTlaCqAUje3SP01w/0L3Ca3dx2SXeGLeLEXwA23Cf0lAgw+aC2P/koCB2tz2x0lT5wTPIRKM05Ant+QZ3H2hCgoSEItlkQW0h9uT0XzgQ0CwKkwcwhep/kaTpnntMhwluyV/vsSJrwVpPgHxBmo+jP0bArIWLk8RdeobO8EXNSdIaYjREEkoQkC+JE3bcYM2TvkjNg4aJyV+oeedRUCeeuBrKXlfDfRaO37LoD9iy/i5ifsxeyfSEBAaoKpCs2PADoY/AaGFy5pn7ASdC/wsKjEhbgUrQkCkQogERqlULEAmC0WNTAKCV+iKYcaU/5oserB9VYZdu/lWhpQjnVcTWouANdmX1H3LmIFnL7yopcOvkYZgw7o4AXngeq0qBQwoGwgNVYPGKwrRTMCUQ9ggjgRoWNRNH5bSDOvphJyMkBIL/JKaEMWgZh7BM/9rAkILN0USogwnWK3EGGuogFGAgLgWhDbO06uXfIdT4OcBWeqKhdlQNmnkEzplnlVVlkNNNn/patbmekCccB0DqMz6OUBUBWgLl5ygiwS7Pjlz2xpSdSlAQKRC/j/HahgalM0gIB/COF5Hkyz9HDgQumuQwdf0I0pOK2zjtG4+Abt0LAGhgu2DQOy68T1V7ASTDWEbYf0rJwE5FWJ1H/8RFZyg6QTk/TpW/eLWGQuHp5eT0i8OQbjLqiDNPoKxTNAxwI2MmeBtX07D2Am+OfMaaQg4VoCA2PalSMBTTxiLor4E5N4z84tlGjQSlRx26Yl8hSu+g9TImuwBISvbYYhy1D522TAlCmInePLFTlmJMcaicONPQE6FuMWXDqhhQBbSk4BQycQhDDn+EsuW+jspqIekXRyC8S7Sg2k+AXG4dBBMSNm8393LrA7KTvDAhRevz3zG64ubXQoQkFOh9BsrmR2Q7PIkIB/COAICySVyUj52GbYrfcCV9WCKH8EY/qnYDkR76n32XGQ1vEaT5gT3nfwQV2I0dSEKEFA2SJkvDJaSRgnJn4B8CEOZlGQa8tkVWYqSU9ve0IMp7gE5Jmiz7R3mA027nY60lEBF1pCiKAI5wa8fI1mJOVSUgEdtaEil1C+AMNQX9CUgpKo5YoNMg6Fao49d2iSkxMoZS07QgylOQK6xttkwNB3AQWOi0Hab5J0CjxbdhAgypelO8PCZG1rz0FF+ArIkJdbJfFcJqC/oRUDmChY5AhWQTEMhuyBXSReHkBJ7MwmIpxvbr/oq/EtgQuT4Ki/+YSOft8uyneA98fIhd4kJuNefgCydhwl7f0EbVl5mhVQQMGvaGeNokGmgLIfAk40hCxDLpxVxmakgU8mKAXVuAlat3jbcdgh6LMairc/bKdK/0I7JlnT0Lak5i8RPuupNjYAXbXvjVwb7eMCYBOYXsGPE4BnqRjsio+MkoV6lbscbEwYqPoRnVx8CCI2pP4jqZyvi0SeqwF/uHQjdXXcJyyu2vSpap411a4JXDvoRcEbD76Ur9qjvW1WVx1w63qNXFTNq6C4wsnshjBw5fMi4LoOmBkjifIq/AimdIJK5P2QF6oXHcjWfFRjJBOQQpV2eRqjcMkhtRcDtNDoCzrACw5mAKDUn0ctFFC6bFYj9q79dMuI6TdeCLB/WOI/VwytuCqrvfHpcH5Tdo5c6N2DJwiUL64j/27MgSnWtubL/Jsne2dO7/cLMRSPRCcqOHru3zcTPTt9+qMaZQJ0e0b3XL3RfNLecXdzaaIXSCnpXHlfrjIjNgB0jhsxRgSPg3Jk9Rv5Cj269wR16GXqvXzSiEYuijSpwdm3v1Q2YuSGHXevC7cOA2VEPvphmwZaL/fbMGKHtsBnHx/dUJb9Dq9/0xt+rbXzmn+wHl0fFbNmrUxkAAAAASUVORK5CYII="
                                alt="aparavi logo"/>
                        </section>
                        <section className="w-1/2 mt-12">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                Email
                            </label>
                            <input
                                id="username"
                                className={'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' + (errors.hasOwnProperty('username') ? "border-red-500" : '')}
                                name="username"
                                type="text"
                                placeholder="e.g. some.example"
                                value={credentials.username}
                                onChange={handleInputChange}
                            />
                            {errors.hasOwnProperty('username') &&
                                <p className="text-red-500 text-xs italic">{errors.username}</p>
                            }
                        </section>
                        <section className="w-1/2">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                className={'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' + (errors.hasOwnProperty('password') ? "border-red-500" : '')}
                                name="password"
                                type="password"
                                placeholder="* * * * * * * *"
                                value={credentials.password}
                                onChange={handleInputChange}
                            />
                            {errors.hasOwnProperty('username') &&
                                <p className="text-red-500 text-xs italic">{errors.username}</p>
                            }
                        </section>
                        <section className="flex justify-start mt-3 w-full">
                            <button
                                className="bg-orange-600 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:border-none">
                                Sign in
                            </button>
                        </section>
                    </form>
                </section>
            </main>
        </App>

    );
}

export default LoginFormComponent;
