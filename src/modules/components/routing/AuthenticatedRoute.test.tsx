import React from 'react';
import { render } from '@testing-library/react';
import AuthenticatedRoute from './AuthenticatedRoute';
import { MemoryRouter } from 'react-router-dom';

it('Renders an Authenticated Route', () => {
    render(
        <MemoryRouter>
            <AuthenticatedRoute path="/div">
                <div />
            </AuthenticatedRoute>
        </MemoryRouter>,
    );
});

// Doesn't work, need to research test Ids and debug
// it("Has the right component rendered", () => {
//     const { getByText } = render(
//         <MemoryRouter>
//             <AuthenticatedRoute path="/div">
//                 <div>sample-text</div>
//             </AuthenticatedRoute>
//         </MemoryRouter>
//     )
//   const div = getByText("sample-text")
//   expect(div).toBeInTheDocument();
// })
