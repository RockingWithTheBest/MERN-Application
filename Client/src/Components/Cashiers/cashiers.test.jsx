import { describe, it, vi } from "vitest";
import {render, screen ,waitFor, fireEvent} from "@testing-library/react";
import Cashier from './Cashiers';
import axios from 'axios'



describe("Cashier component", () => {
    it("cahiers component", () => {
       const {container} =  render(<Cashier/>)
       expect(container).toMatchSnapshot()
    })

    it("fetches and displays cashiers", async () => {
        
        const mockCashiers = {
            data:{
                cashier:[
                    {_id:'67500cfff2d7ad43bf82fa2d', full_name:'Zimba Charlse', password:'PN235632'},
                    {_id:'67584d271661a69c9b15d7c8',full_name:'Ben Clyde Sikanwe', password:'PN123456'}
                ]
            }
        }

        axios.get = vi.fn().mockResolvedValueOnce(mockCashiers)
        render(<Cashier/>)

        await waitFor(
            ()=> expect(screen.getByText("Zimba Charlse")).toBeInTheDocument()
        )
        expect(screen.getByText("Ben Clyde Sikanwe")).toBeInTheDocument();
        //This function searches the rendered output (the DOM) for an element that contains the text "Zimba Charlse".
    })

    it("adds a new cashier", async () => {
        const mockCashier ={
            data:{
                cashier:[
                    { _id: "67584d271661a69c9b15d7c8", full_name: "John Doe", password: "12345" }
                ]
            }
        }

        axios.get = vi.fn().mockResolvedValueOnce(mockCashier)
        axios.post = vi.fn().mockResolvedValueOnce({});

        render(<Cashier/>)


        fireEvent.change(screen.getByLabelText(/Full Name/i),{
            target:{value:"New Cashier"}
        })

        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: "newpassword" }
           });
    

        fireEvent.click(screen.getByText(/Add Client/i));
       expect(axios.post).toHaveBeenCalledWith("http://localhost:1000/cashier",{
            full_name: "New Cashier",
            password: "newpassword",
       })
    })

    it("deletes a cashier", async () => {
        const mockCashier ={
            data:{
                cashier:[
                    { _id: "67584d271661a69c9b15d7c8", full_name: "Mulenga Bwaba", password: "12345" }
                ]
            }
        }
        axios.get = vi.fn().mockResolvedValueOnce(mockCashier)
        axios.delete = vi.fn().mockResolvedValueOnce({});

        global.confirm = vi.fn(() => true); 

        render(<Cashier/>)

        await waitFor(()=>expect(screen.getByText(/Mulenga Bwaba/i)).toBeInTheDocument())

     
            fireEvent.click(screen.getByText(/Delete Cashier/i))
       
        expect(axios.delete).toHaveBeenCalledWith("http://localhost:1000/cashier/67584d271661a69c9b15d7c8")
    })
})