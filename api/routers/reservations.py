from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models import ReservationIn, ReservationOut, ReservationList, PydanticObjectId, PropertyOut
from queries.reservations import ReservationsRepo
from authenticator import authenticator
from queries.properties import PropertiesRepo


router = APIRouter()

@router.post("/api/reservations", response_model=ReservationOut, status_code=200)
def create_reservation(
    reservation_in: ReservationIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    reservations_repo: ReservationsRepo = Depends()
):
    new_reservation = reservations_repo.create(reservation=reservation_in , guest_id=account_data["id"])
    if not new_reservation:
        raise HTTPException(status_code=400, detail="Error creating reservation.")

    return new_reservation


@router.put("/api/reservations/{reservation_id}", response_model=ReservationOut)
def update_reservation(
    reservation_id: str,
    reservation_update: ReservationIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    reservations_repo: ReservationsRepo = Depends()
):
    updated_reservation = reservations_repo.update(reservation_id, reservation_update)
    if updated_reservation:
        return updated_reservation
    else:
        raise HTTPException(status_code=404, detail="Reservation not found.")

@router.get("/api/reservations", response_model=ReservationList)
def list_reservations_by_account(
    account_data: dict = Depends(authenticator.get_current_account_data),
    reservations_repo: ReservationsRepo = Depends()
    ):
    return ReservationList(reservations=reservations_repo.get_all(guest_id=account_data['id']))

@router.delete("/api/reservations/{reservation_id}", status_code=status.HTTP_200_OK)
def delete_reservation(
    reservation_id: str, repo: ReservationsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
    ):
    if not repo.delete_reservation(reservation_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reservation not found")
    return {"message": "Reservation deleted successfully"}

@router.get("/api/reservations/{reservation_id}", response_model=ReservationOut)
def get_reservation_by_account(
    reservation_id: str, repo: ReservationsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
    ):
    reservation = repo.get_one(reservation_id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation
