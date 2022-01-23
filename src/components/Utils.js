import styled from "styled-components";

export const ErrorMessage = styled.div`
          color: #dd1818;
          margin-left: 5px;
          padding: 3px;
`;

export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: 'ind',
    // style: 'currency',
    minimumFractionDigits: 0
})