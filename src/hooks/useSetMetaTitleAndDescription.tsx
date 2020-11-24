import React, {useEffect} from 'react';

const useSetMetaTitleAndDescription = (title:string, description:string) => {
    useEffect(() => {
        document.title = title
        const metaDescription = document.querySelector('meta[name="description"]')
        metaDescription && metaDescription.setAttribute("content", description);
    })
}

export default useSetMetaTitleAndDescription;
