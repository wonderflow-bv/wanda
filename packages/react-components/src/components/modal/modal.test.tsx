/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { useState } from 'react';

import { Button } from '@/components';

import { ResponsiveProvider } from '../../providers';
import { ModalContent } from './content/modal-content';
import { ModalFooter } from './footer/modal-footer';
import { Modal } from './modal';

const ModalTemplate = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <ResponsiveProvider>
      <Button onClick={() => setIsVisible(true)}>Show Modal</Button>

      <Modal
        isVisible={isVisible}
        onCloseModal={() => setIsVisible(false)}
        content={<p>Modal content</p>}
        primaryAction={<Button onClick={() => setIsVisible(false)}>OK</Button>}
      />
    </ResponsiveProvider>
  );
};

// describe('<Modal>', () => {
//   test('it should render properly', () => {
//     const { result } = renderHook(() => useResponsiveContext());
//     const { container } = render(<ModalTemplate />);
//     expect(result).toBeDefined();
//     expect(container).toBeDefined();
//   });

//   test('it should render properly with children', () => {
//     const { container } = render(
//       <Modal
//         isVisible
//         onCloseModal={() => ({})}
//       >
//         <ModalHeader>test</ModalHeader>
//         <ModalContent>test</ModalContent>
//         <ModalFooter>test</ModalFooter>
//       </Modal>,
//     );
//     expect(container).toBeDefined();
//   });
// });

describe('<Modal.Header>', () => {
  test.todo('it should render properly');
  // ,() => {
  //   const { container } = render(<ModalHeader>test</ModalHeader>);
  //   const t = screen.getByText(/test/i);
  //   expect(t).toHaveTextContent('test');
  //   expect(container).toBeDefined();
  // }
});

describe('<Modal.Content>', () => {
  test('it should render properly', () => {
    const { container } = render(<ModalContent>test</ModalContent>);
    const t = screen.getByText(/test/i);
    expect(t).toHaveTextContent('test');
    expect(container).toBeDefined();
  });
});

describe('<Modal.Footer>', () => {
  test('it should render properly', () => {
    const { container } = render(<ModalFooter>test</ModalFooter>);
    const t = screen.getByText(/test/i);
    expect(t).toHaveTextContent('test');
    expect(container).toBeDefined();
  });
});
